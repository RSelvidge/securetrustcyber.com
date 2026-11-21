import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html=readFileSync(new URL('../cloudflare/helpdesk.html',import.meta.url),'utf8');
const source=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const origin='https://securetrustcyber.com';
const widgetOrigin='https://app.netzenai.com';
const frameUrl=widgetOrigin+'/widget/?orgId=wqaFJX5TwhwBNyfMUbRw&widgetKey=wgt_live_add4d8106074f410&customerOrigin='+encodeURIComponent(origin);

function setup(src=frameUrl){
  const handlers={},intervals=[],timeouts=[],observers=[];
  const button={disabled:true,textContent:'Loading chat…',addEventListener(type,fn){handlers['button:'+type]=fn;}};
  const status={textContent:'Connecting to the helpdesk.'};
  const frame={src,contentWindow:{}};
  const window={location:{origin},addEventListener(type,fn){handlers[type]=fn;}};
  const document={body:{},getElementById(id){return {'open-chat':button,'chat-status':status,'netzenbot-iframe':frame}[id]||null;}};
  class Observer{constructor(fn){this.fn=fn;observers.push(this);}observe(){}disconnect(){this.disconnected=true;}}
  const context=vm.createContext({window,document,URL,MutationObserver:Observer,
    setInterval(fn){intervals.push(fn);return intervals.length;},clearInterval(){},
    setTimeout(fn){timeouts.push(fn);return timeouts.length;}});
  vm.runInContext(source,context);
  let opened=0;
  window.NetZenBot.open=()=>opened++;
  return {window,button,status,frame,handlers,intervals,timeouts,observers,
    opened:()=>opened,
    mutation(){observers.forEach(o=>{if(!o.disconnected)o.fn([]);});},
    message(type,from=widgetOrigin,sender=frame.contentWindow){handlers.message?.({origin:from,source:sender,data:{type}});}};
}

test('canonicalizes the official widget URL without changing identity or host',()=>{
  const s=setup();s.mutation();
  const actual=new URL(s.frame.src),expected=new URL(frameUrl);
  assert.equal(actual.pathname,'/widget');
  assert.equal(actual.origin,expected.origin);
  assert.equal(actual.search,expected.search);
});

test('does not rewrite unrelated or mismatched frames',()=>{
  for(const url of [frameUrl.replace(widgetOrigin,'https://example.invalid'),
    frameUrl.replace('/widget/','/tickets/'),frameUrl.replace('wgt_live_add4d8106074f410','different-widget'),
    frameUrl.replace(encodeURIComponent(origin),encodeURIComponent('https://example.invalid'))]){
    const s=setup(url);s.mutation();assert.equal(s.frame.src,url);
  }
});

test('a loaded launcher API alone does not advertise a ready chat',()=>{
  const s=setup();s.intervals.forEach(fn=>fn());
  assert.equal(s.button.disabled,true);
});

test('only the expected widget window and origin can enable chat',()=>{
  const s=setup();
  s.message('NETZENBOT_READY','https://example.invalid');
  s.message('NETZENBOT_READY',widgetOrigin,{});
  s.message('unrelated');
  s.intervals.forEach(fn=>fn());
  assert.equal(s.button.disabled,true);
  s.message('NETZENBOT_READY');
  assert.equal(s.button.disabled,false);
  s.handlers['button:click']();
  assert.equal(s.opened(),1);
});

test('a slow widget can recover after the timeout',()=>{
  const s=setup();s.timeouts.forEach(fn=>fn());
  assert.equal(s.button.disabled,true);
  assert.match(s.status.textContent,/support portal/);
  s.message('NETZENBOT_READY');
  assert.equal(s.button.disabled,false);
});

test('widget errors expose the fallback instead of enabling an empty chat',()=>{
  const s=setup();s.message('NETZENBOT_ERROR');
  assert.equal(s.button.disabled,true);
  assert.match(s.status.textContent,/support portal/);
});
