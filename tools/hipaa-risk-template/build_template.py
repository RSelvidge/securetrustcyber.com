"""Build the SecureTrust Cyber HIPAA risk assessment template (blank + completed example).

python build_template.py <out_dir>
"""
import sys
from datetime import date
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule
from openpyxl.comments import Comment

SERVICE_URL = 'https://securetrustcyber.com/services/hipaa-risk-assessment'
HHS_URL = 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/guidance-risk-analysis/index.html'
SRA_URL = 'https://www.healthit.gov/topic/privacy-security-and-hipaa/security-risk-assessment-tool'

F = 'Arial'
NAVY = '0B1F4D'
INPUT = PatternFill('solid', fgColor='FFF7CC')   # cells to fill in
HEAD = PatternFill('solid', fgColor=NAVY)
SUB = PatternFill('solid', fgColor='E8EEF7')
EXFILL = PatternFill('solid', fgColor='F2F2F2')
thin = Side(style='thin', color='C9D1DD')
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
WRAP = Alignment(wrap_text=True, vertical='top')
CENTER = Alignment(horizontal='center', vertical='top', wrap_text=True)

def font(**k):
    k.setdefault('name', F); k.setdefault('size', 10)
    return Font(**k)

def banner(ws, title, sub, width):
    ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=width)
    ws.merge_cells(start_row=2, start_column=1, end_row=2, end_column=width)
    ws['A1'] = title
    ws['A1'].font = font(size=15, bold=True, color='FFFFFF'); ws['A1'].fill = HEAD
    ws['A1'].alignment = Alignment(vertical='center', indent=1)
    ws.row_dimensions[1].height = 30
    ws['A2'] = sub
    ws['A2'].font = font(size=9, italic=True, color='44546A'); ws['A2'].alignment = Alignment(wrap_text=True, vertical='top', indent=1)
    ws.row_dimensions[2].height = 30

def header_row(ws, row, headers, widths):
    for i, (h, w) in enumerate(zip(headers, widths), start=1):
        c = ws.cell(row=row, column=i, value=h)
        c.font = font(bold=True, color='FFFFFF'); c.fill = PatternFill('solid', fgColor='1B6FA8')
        c.alignment = Alignment(wrap_text=True, vertical='center'); c.border = BOX
        ws.column_dimensions[c.column_letter].width = w
    ws.row_dimensions[row].height = 32

def body_cell(ws, r, col, val, fill=None, align=WRAP, fmt=None, italic=False, color='000000'):
    c = ws.cell(row=r, column=col, value=val)
    c.font = font(italic=italic, color=color); c.alignment = align; c.border = BOX
    if fill: c.fill = fill
    if fmt: c.number_format = fmt
    return c

def setup_print(ws, landscape=True):
    ws.page_setup.orientation = 'landscape' if landscape else 'portrait'
    ws.page_setup.fitToWidth = 1; ws.page_setup.fitToHeight = 0
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.print_options.gridLines = False
    ws.oddFooter.left.text = 'SecureTrust Cyber HIPAA Risk Assessment Template'
    ws.oddFooter.right.text = 'Page &P of &N'

# ---------------------------------------------------------------- content
EXAMPLE_NAME = 'Maple Street Family Dental (fictional example)'

SCOPE_FIELDS = [
    ('Practice name', EXAMPLE_NAME, 'Your practice’s legal or trading name.'),
    ('Locations in scope', 'One office: 412 Maple Street (fictional address)', 'Every location where ePHI is created, received, kept or sent, including home offices.'),
    ('Workforce size', '2 dentists, 3 hygienists, 2 assistants, 2 front desk, 1 office manager', 'Staff, contractors and volunteers.'),
    ('Assessment start date', date(2026, 11, 2), 'When work on this assessment began.'),
    ('Assessment completed date', date(2026, 11, 16), 'When this version was finished.'),
    ('Prepared by', 'Office manager, with the practice’s IT provider', 'Who did the assessment. Name an outside assessor if you used one.'),
    ('Approved by', 'Practice owner', 'Who reviewed and accepted the results.'),
    ('Security official', 'Office manager', 'The person responsible for security in the practice.'),
    ('Scope statement', 'All ePHI the practice creates, receives, maintains or transmits: practice management, imaging, email, online forms, claims, backups, and every workstation and server that touches them.', 'HHS says the analysis should cover all ePHI. Note anything you excluded and why.'),
    ('Method used', 'Interviews with staff and the IT provider, review of account lists and backup reports, walk-through of the office. Likelihood and impact rated 1 to 3 (see 4 Risk Matrix).', 'HHS does not prescribe a method. Describe yours so the next reviewer can repeat it.'),
    ('Next scheduled review', date(2027, 11, 16), 'HHS sets no fixed frequency. Pick a date, and also review after the triggers below.'),
    ('Review triggers', 'New software or equipment, a new vendor with system access, a security incident, office move or remodel, change of ownership, significant staff turnover.', 'Events that should prompt an update before the scheduled date.'),
]

INV_HEAD = ['System or asset', 'Type', 'What ePHI it holds or sends', 'Where it is located or hosted', 'Who can access it', 'Vendor or business associate', 'BAA on file?', 'Notes']
INV_W = [26, 16, 34, 26, 28, 24, 11, 30]
INV_FORMAT_ROW = ['Practice management server', 'Server', 'Schedules, charts, treatment plans, billing', 'Server closet, back office', 'All staff via named logins; IT provider (admin)', 'Practice management software vendor', 'Yes', 'Example row: shows the expected format. Overwrite it.']
INV_EXAMPLE = [
    ['Practice management server', 'Server', 'Schedules, charts, treatment plans, insurance and billing', 'Server closet, back office (locked)', 'All staff via named logins; IT provider and software vendor (admin)', 'Practice management software vendor', 'Yes', 'Windows Server; database backed up nightly'],
    ['Imaging software and X-ray sensors', 'Application / device', 'Radiographs and intraoral photos linked to patient records', 'Imaging workstation in operatory 2; images stored on server', 'Clinical staff; imaging vendor via remote support', 'Imaging software vendor', 'Yes', 'Imaging workstation runs an older OS the vendor supports'],
    ['Front desk workstations (3)', 'Workstation', 'Schedules, demographics, insurance, scanned forms', 'Front desk', 'Front desk staff, office manager', 'IT provider (managed)', 'Yes', ''],
    ['Operatory workstations (4)', 'Workstation', 'Charts, treatment notes, imaging viewer', 'Operatories 1–4', 'Dentists, hygienists, assistants', 'IT provider (managed)', 'Yes', 'Screens visible to patients in chair'],
    ['Cloud email', 'Cloud service', 'Referrals, lab orders, patient questions, attachments', 'Email provider’s cloud', 'All staff; IT provider (admin)', 'Email provider', 'Yes', ''],
    ['Online forms and scheduling', 'Cloud service', 'New patient forms, medical history, appointment requests', 'Vendor’s cloud', 'Front desk, office manager', 'Patient forms vendor', 'Yes', ''],
    ['Claims clearinghouse', 'Cloud service', 'Claims and remittance data', 'Vendor’s cloud', 'Front desk (billing), office manager', 'Clearinghouse', 'Yes', ''],
    ['Backups: local device and cloud', 'Backup', 'Full copies of server data and images', 'Backup device in server closet; copy in backup vendor’s cloud', 'IT provider', 'IT provider; cloud backup vendor', 'Yes', 'Restore last tested over a year ago'],
    ['Remote access tool', 'Remote access', 'Indirect: full access to systems above', 'Installed on server and workstations', 'IT provider; imaging vendor', 'IT provider; imaging vendor', 'Yes', 'Imaging vendor uses a shared account'],
    ['Office manager laptop', 'Laptop', 'Reports exported from practice management, payroll', 'Taken home some evenings', 'Office manager', 'IT provider (managed)', 'Yes', 'Disk encryption status unknown'],
]

REG_HEAD = ['ID', 'System or asset', 'Threat', 'Vulnerability', 'Current safeguards', 'Safeguards working as intended?', 'Likelihood (1–3)', 'Impact (1–3)', 'Risk score', 'Risk level', 'Corrective action', 'Owner', 'Target date', 'Status']
REG_W = [6, 22, 24, 30, 30, 15, 11, 10, 9, 10, 34, 18, 12, 13]
REG_FORMAT_ROW = ['EX', 'Practice management server', 'Ransomware', 'Backups not tested', 'Nightly backups to a local device', 'Not verified', 2, 3, None, None, 'Run and document a restore test', 'IT provider', date(2026, 12, 31), 'Open']
REG_EXAMPLE = [
    ['R1', 'Remote access tool', 'Attacker uses vendor remote access', 'Imaging vendor shares one login with no multifactor sign-in; access is always on', 'Vendor has a BAA; remote tool requires a password', 'No', 3, 3, None, None, 'Named vendor accounts with multifactor sign-in; turn access on only when requested; log sessions', 'IT provider', date(2026, 12, 15), 'In progress'],
    ['R2', 'Backups: local device and cloud', 'Ransomware or server failure', 'Restore not tested in over a year; imaging files not confirmed in backup', 'Nightly local backup; cloud copy', 'Not verified', 2, 3, None, None, 'Restore one patient chart and one day of images; record time taken; confirm imaging is included', 'IT provider', date(2026, 12, 5), 'Open'],
    ['R3', 'Practice management server', 'Former employee accesses records', 'Two former staff accounts still active', 'Named logins for current staff', 'Partly', 2, 2, None, None, 'Disable the accounts; add account removal to the offboarding checklist', 'Office manager', date(2026, 11, 20), 'Done'],
    ['R4', 'Cloud email', 'Phishing leads to account takeover', 'Multifactor sign-in not enforced for all users', 'Spam filtering; staff told to report suspicious email', 'Partly', 3, 2, None, None, 'Enforce multifactor sign-in for every mailbox; short phishing refresher for staff', 'IT provider', date(2026, 12, 1), 'In progress'],
    ['R5', 'Imaging software and X-ray sensors', 'Malware exploits unpatched system', 'Imaging workstation cannot take the newest OS updates', 'Endpoint protection installed', 'Yes', 2, 2, None, None, 'Ask vendor for supported upgrade path; limit what the workstation can reach on the network', 'Dr. Owner with IT provider', date(2027, 2, 28), 'Open'],
    ['R6', 'Office manager laptop', 'Lost or stolen laptop', 'Disk encryption not confirmed', 'Password at sign-in', 'Not verified', 2, 2, None, None, 'Confirm full-disk encryption; if not possible, document why and the alternative used', 'IT provider', date(2026, 12, 1), 'Open'],
    ['R7', 'Operatory workstations (4)', 'Patient or visitor sees another patient’s information', 'Screens face the chair; no automatic screen lock', 'Staff asked to minimize charts', 'Partly', 2, 1, None, None, 'Set screen lock after short idle time; angle monitors or add privacy filters', 'Office manager', date(2026, 12, 15), 'Open'],
    ['R8', 'All systems', 'Staff do not recognize or report an incident', 'No security training in the past year; no posted incident contact', 'New-hire HIPAA privacy training', 'Partly', 2, 2, None, None, 'Annual security awareness training; post incident contact card at front desk', 'Office manager', date(2027, 1, 31), 'Open'],
    ['R9', 'Online forms and scheduling', 'Vendor breach exposes intake forms', 'Vendor security not reviewed since signup', 'BAA in place', 'Yes', 1, 2, None, None, 'Ask vendor for its latest security summary; confirm data retention settings', 'Office manager', date(2027, 1, 31), 'Open'],
    ['R10', 'Practice management server', 'Power loss or hardware failure', 'No written plan for running the office during an outage', 'Battery backup on server', 'Yes', 2, 2, None, None, 'Write a one-page downtime plan: printed next-day schedule, contact list, who calls whom', 'Office manager', date(2027, 1, 15), 'Open'],
    ['R11', 'Front desk workstations (3)', 'Shared login hides who accessed records', 'One front desk computer uses a shared Windows login', 'Practice management uses named logins', 'Partly', 2, 1, None, None, 'Give each front desk user their own Windows login', 'IT provider', date(2026, 11, 30), 'Done'],
]

STATUS = ['Open', 'In progress', 'Done', 'Accepted risk']

LIKELIHOOD = [(1, 'Low', 'Unlikely in the next year given current safeguards.'),
              (2, 'Medium', 'Could reasonably happen in the next year.'),
              (3, 'High', 'Likely, or has happened before.')]
IMPACT = [(1, 'Low', 'Little effect on patient care; few or no records exposed.'),
          (2, 'Medium', 'Disrupts the office for hours, or exposes some records.'),
          (3, 'High', 'Stops patient care for a day or more, or exposes many records.')]

LOG_HEAD = ['Review date', 'Reason for review', 'Reviewed by', 'What changed', 'Next review date']
LOG_W = [14, 34, 22, 48, 16]
LOG_EXAMPLE = [[date(2026, 11, 16), 'First documented assessment', 'Office manager; IT provider', 'Initial version. 11 risks recorded; 2 closed during the assessment.', date(2027, 11, 16)]]
LOG_FORMAT_ROW = [date(2026, 11, 16), 'Annual review', 'Office manager', 'Example row: shows the expected format. Overwrite it.', date(2027, 11, 16)]

# ---------------------------------------------------------------- sheets
def start_sheet(wb, example):
    ws = wb.active; ws.title = 'Start Here'
    ws.sheet_view.showGridLines = False
    ws.column_dimensions['A'].width = 3; ws.column_dimensions['B'].width = 30; ws.column_dimensions['C'].width = 95
    title = 'HIPAA Security Risk Assessment: Completed Example' if example else 'HIPAA Security Risk Assessment Template'
    ws.merge_cells('A1:C1'); ws['A1'] = title
    ws['A1'].font = font(size=16, bold=True, color='FFFFFF'); ws['A1'].fill = HEAD; ws['A1'].alignment = Alignment(vertical='center', indent=1)
    ws.row_dimensions[1].height = 34
    ws.merge_cells('A2:C2'); ws['A2'] = 'For independent dental and medical practices. From SecureTrust Cyber, securetrustcyber.com'
    ws['A2'].font = font(size=10, italic=True, color='44546A'); ws['A2'].alignment = Alignment(indent=1)
    r = 4
    def para(label, text, bold_label=True, link=None, h=None):
        nonlocal r
        b = ws.cell(row=r, column=2, value=label); b.font = font(bold=bold_label); b.alignment = WRAP
        c = ws.cell(row=r, column=3, value=text); c.font = font(color='1B6FA8', underline='single') if link else font(); c.alignment = WRAP
        if link: c.hyperlink = link
        if h: ws.row_dimensions[r].height = h
        r += 1
    if example:
        para('About this file', f'A completed example for {EXAMPLE_NAME}. The practice, its systems and its findings are invented to show how a finished assessment reads. Use the blank template for your own practice.', h=42)
    else:
        para('About this file', 'A spreadsheet for documenting a HIPAA Security Rule risk analysis: where your electronic patient information (ePHI) lives, what could go wrong, how serious each risk is, and who will fix it. A completed example for a fictional dental practice is available as a separate download.', h=42)
    para('What HIPAA requires', 'The Security Rule requires an accurate and thorough assessment of the risks to the ePHI you hold (45 CFR §164.308(a)(1)(ii)(A)) and measures that reduce those risks to a reasonable level (§164.308(a)(1)(ii)(B)). The analysis must be documented. HHS does not require a specific method or format, and does not set a fixed frequency.', h=56)
    para('Keep your records', 'Keep this documentation for 6 years from when it was created or last in effect, whichever is later, and update it as needed (45 CFR §164.316(b)(2)).', h=30)
    r += 1
    hdr = ws.cell(row=r, column=2, value='How to use it'); hdr.font = font(size=12, bold=True, color=NAVY); r += 1
    steps = [
        ('1 Practice & Scope', 'Record who did the assessment, what it covers and when it will be reviewed. HHS steps: scope of the analysis.'),
        ('2 ePHI Inventory', 'List every system, device, cloud service and backup that stores or sends ePHI, and who supports it. HHS step: data collection.'),
        ('3 Risk Register', 'For each system, record realistic threats, the weaknesses they could exploit and the safeguards you have now. HHS steps: identify threats and vulnerabilities; assess current security measures.'),
        ('3 Risk Register, ratings', 'Rate likelihood and impact from 1 to 3 using 4 Risk Matrix. The risk score and level calculate automatically. HHS steps: likelihood, impact, level of risk.'),
        ('3 Risk Register, actions', 'Give every risk a corrective action, an owner and a target date. Use Accepted risk only for a documented decision. Security Rule: risk management.'),
        ('5 Review Log', 'Record each review and what changed. HHS step: periodic review and updates.'),
    ]
    for a, b in steps: para(a, b, h=30)
    r += 1
    hdr = ws.cell(row=r, column=2, value='Legend'); hdr.font = font(size=12, bold=True, color=NAVY); r += 1
    lg = ws.cell(row=r, column=2, value='Yellow cells'); lg.fill = INPUT; lg.font = font(); lg.border = BOX
    ws.cell(row=r, column=3, value='Fill these in. Pick Likelihood, Impact, Status and BAA from the drop-down lists.').font = font(); r += 1
    lg = ws.cell(row=r, column=2, value='White cells, black text'); lg.font = font(); lg.border = BOX
    ws.cell(row=r, column=3, value='Calculated: Risk score (Likelihood × Impact), Risk level and the summary counts. Do not type over them.').font = font(); r += 1
    if not example:
        lg = ws.cell(row=r, column=2, value='Grey italic row'); lg.fill = EXFILL; lg.font = font(italic=True); lg.border = BOX
        ws.cell(row=r, column=3, value='Example row (ID "EX") showing the expected format. Overwrite or delete it. It is left out of the summary counts.').font = font(); r += 1
    r += 1
    hdr = ws.cell(row=r, column=2, value='Good to know'); hdr.font = font(size=12, bold=True, color=NAVY); r += 1
    para('Not a compliance guarantee', 'Completing this template does not make a practice HIPAA compliant. It is a structured way to document your analysis. This file is general information, not legal advice.', h=30)
    para('Keep patient data out', 'Describe systems and risks. Do not enter patient names or other patient information in this file.', h=18)
    para('HHS guidance', 'HHS guidance on risk analysis', link=HHS_URL)
    para('Free HHS tool', 'HHS Security Risk Assessment (SRA) Tool for small and medium practices', link=SRA_URL)
    para('Want an engineer to do it?', 'SecureTrust Cyber HIPAA Security Risk Assessment service', link=SERVICE_URL)
    setup_print(ws, landscape=False)

def scope_sheet(wb, example):
    ws = wb.create_sheet('1 Practice & Scope'); ws.sheet_view.showGridLines = False
    banner(ws, '1  Practice and scope', 'Who did the assessment, what it covers and when it will be reviewed again.', 3)
    header_row(ws, 4, ['Item', 'Your answer', 'Guidance'], [28, 62, 52])
    for i, (label, ex, guide) in enumerate(SCOPE_FIELDS, start=5):
        body_cell(ws, i, 1, label).font = font(bold=True)
        is_date = isinstance(ex, date)
        c = body_cell(ws, i, 2, ex if example else None, fill=INPUT, fmt='yyyy-mm-dd' if is_date else None)
        body_cell(ws, i, 3, guide, color='44546A')
        ws.row_dimensions[i].height = 44 if len(guide) > 70 or (example and isinstance(ex, str) and len(ex) > 70) else 30
    ws.freeze_panes = 'A5'
    setup_print(ws)

def table_sheet(wb, name, title, sub, head, widths, rows, format_row, example, extra=None):
    ws = wb.create_sheet(name); ws.sheet_view.showGridLines = False
    banner(ws, title, sub, len(head))
    header_row(ws, 4, head, widths)
    data = rows if example else [format_row]
    n_blank = 5 if example else 40
    r = 5
    for row in data:
        lines = 1
        for j, v in enumerate(row, start=1):
            c = body_cell(ws, r, j, v, fill=(EXFILL if not example else INPUT),
                          italic=not example, color=('595959' if not example else '000000'),
                          fmt='yyyy-mm-dd' if isinstance(v, date) else None)
            if isinstance(v, str):
                lines = max(lines, -(-len(v) // max(1, int(widths[j - 1] * 1.05))))
        ws.row_dimensions[r].height = max(15, 13.5 * lines + 3)
        r += 1
    for _ in range(n_blank):
        for j in range(1, len(head) + 1):
            body_cell(ws, r, j, None, fill=INPUT)
        r += 1
    last = r - 1
    ws.freeze_panes = 'B5'
    if extra: extra(ws, last)
    setup_print(ws)
    return ws, last

def register_extra(ws, last):
    # formulas, validation, formatting on the risk register
    matrix = "'4 Risk Matrix'"
    for r in range(5, last + 1):
        for col in ('A', 'G', 'H', 'N'):
            ws[f'{col}{r}'].alignment = CENTER
        ws[f'I{r}'] = f'=IF(OR(G{r}="",H{r}=""),"",G{r}*H{r})'
        ws[f'J{r}'] = f'=IF(I{r}="","",IF(I{r}>={matrix}!$C$14,"High",IF(I{r}>={matrix}!$C$15,"Medium","Low")))'
        for col in ('I', 'J'):
            c = ws[f'{col}{r}']; c.fill = PatternFill(fill_type=None); c.alignment = CENTER
            c.font = font(bold=(col == 'J'))
        ws[f'M{r}'].number_format = 'yyyy-mm-dd'
    dv_score = DataValidation(type='whole', operator='between', formula1='1', formula2='3', allow_blank=True,
                              showErrorMessage=True, errorTitle='Rating 1 to 3', error='Enter 1 (Low), 2 (Medium) or 3 (High). See 4 Risk Matrix.')
    dv_score.add(f'G5:H{last}')
    dv_status = DataValidation(type='list', formula1='"' + ','.join(STATUS) + '"', allow_blank=True)
    dv_status.add(f'N5:N{last}')
    dv_work = DataValidation(type='list', formula1='"Yes,Partly,No,Not verified"', allow_blank=True)
    dv_work.add(f'F5:F{last}')
    dv_date = DataValidation(type='date', operator='greaterThan', formula1='36526', allow_blank=True,
                             showErrorMessage=True, error='Enter a date, for example 2027-01-31.')
    dv_date.add(f'M5:M{last}')
    for dv in (dv_score, dv_status, dv_work, dv_date): ws.add_data_validation(dv)
    rng = f'J5:J{last}'
    ws.conditional_formatting.add(rng, FormulaRule(formula=['$J5="High"'], fill=PatternFill('solid', fgColor='F8D7DA'), font=Font(name=F, bold=True, color='9C1C28')))
    ws.conditional_formatting.add(rng, FormulaRule(formula=['$J5="Medium"'], fill=PatternFill('solid', fgColor='FFE8B3'), font=Font(name=F, bold=True, color='7A4B00')))
    ws.conditional_formatting.add(rng, FormulaRule(formula=['$J5="Low"'], fill=PatternFill('solid', fgColor='D9F2E3'), font=Font(name=F, bold=True, color='1D6B3A')))
    ws['G4'].comment = Comment('1 = Low, 2 = Medium, 3 = High. Definitions on the 4 Risk Matrix tab.', 'SecureTrust Cyber')
    ws['H4'].comment = Comment('1 = Low, 2 = Medium, 3 = High. Definitions on the 4 Risk Matrix tab.', 'SecureTrust Cyber')
    ws['I4'].comment = Comment('Calculated: Likelihood × Impact (1 to 9).', 'SecureTrust Cyber')
    ws['J4'].comment = Comment('Calculated from the thresholds on the 4 Risk Matrix tab.', 'SecureTrust Cyber')
    ws.auto_filter.ref = f'A4:N{last}'
    return last

def inventory_extra(ws, last):
    dv = DataValidation(type='list', formula1='"Yes,No,Not needed,Unknown"', allow_blank=True)
    dv.add(f'G5:G{last}'); ws.add_data_validation(dv)
    for r in range(5, last + 1): ws[f'G{r}'].alignment = CENTER

def log_extra(ws, last):
    for r in range(5, last + 1):
        for col in ('A', 'E'): ws[f'{col}{r}'].number_format = 'yyyy-mm-dd'

def matrix_sheet(wb, reg_last):
    ws = wb.create_sheet('4 Risk Matrix'); ws.sheet_view.showGridLines = False
    banner(ws, '4  Risk matrix and summary', 'How the ratings work, and a live count of the risks in 3 Risk Register.', 6)
    for col, w in zip('ABCDEF', [16, 12, 14, 14, 14, 50]): ws.column_dimensions[col].width = w
    ws['A4'] = 'Likelihood'; ws['A4'].font = font(bold=True, size=11, color=NAVY)
    header_row(ws, 5, ['Rating', 'Label', 'Meaning'], [16, 12, 14])
    ws.merge_cells('C5:F5')
    for i, (n, lab, desc) in enumerate(LIKELIHOOD, start=6):
        body_cell(ws, i, 1, n, align=CENTER); body_cell(ws, i, 2, lab)
        ws.merge_cells(start_row=i, start_column=3, end_row=i, end_column=6); body_cell(ws, i, 3, desc)
    # Thresholds (referenced by the register)
    ws['A12'] = 'Risk level thresholds'; ws['A12'].font = font(bold=True, size=11, color=NAVY)
    for j, h in enumerate(['Level', 'Applies when', 'Score at least'], start=1):
        c = ws.cell(row=13, column=j, value=h); c.font = font(bold=True, color='FFFFFF'); c.fill = PatternFill('solid', fgColor='1B6FA8'); c.border = BOX
    body_cell(ws, 14, 1, 'High'); body_cell(ws, 14, 2, 'Score ≥'); body_cell(ws, 14, 3, 6, fill=INPUT, align=CENTER)
    body_cell(ws, 15, 1, 'Medium'); body_cell(ws, 15, 2, 'Score ≥'); body_cell(ws, 15, 3, 3, fill=INPUT, align=CENTER)
    body_cell(ws, 16, 1, 'Low'); body_cell(ws, 16, 2, 'Otherwise'); body_cell(ws, 16, 3, '1–2', align=CENTER)
    ws['D14'] = 'Change these thresholds only if your practice adopts a different scale; the register updates automatically.'
    ws['D14'].font = font(italic=True, color='44546A', size=9); ws['D14'].alignment = WRAP; ws.merge_cells('D14:F15')
    # Impact definitions
    ws['A18'] = 'Impact'; ws['A18'].font = font(bold=True, size=11, color=NAVY)
    for j, h in enumerate(['Rating', 'Label', 'Meaning'], start=1):
        c = ws.cell(row=19, column=j, value=h); c.font = font(bold=True, color='FFFFFF'); c.fill = PatternFill('solid', fgColor='1B6FA8'); c.border = BOX
    ws.merge_cells('C19:F19')
    for i, (n, lab, desc) in enumerate(IMPACT, start=20):
        body_cell(ws, i, 1, n, align=CENTER); body_cell(ws, i, 2, lab)
        ws.merge_cells(start_row=i, start_column=3, end_row=i, end_column=6); body_cell(ws, i, 3, desc)
    # Score grid: Likelihood rows x Impact columns
    ws['A24'] = 'Score grid (Likelihood × Impact)'; ws['A24'].font = font(bold=True, size=11, color=NAVY)
    hdrs = ['Likelihood ↓  Impact →', 'Low (1)', 'Medium (2)', 'High (3)']
    for j, h in enumerate(hdrs, start=1):
        c = ws.cell(row=25, column=j, value=h); c.font = font(bold=True, color='FFFFFF'); c.fill = PatternFill('solid', fgColor='1B6FA8'); c.border = BOX; c.alignment = CENTER
    for i, (n, lab, _) in enumerate(LIKELIHOOD, start=26):
        body_cell(ws, i, 1, f'{lab} ({n})').font = font(bold=True)
    # simpler: write explicit score formulas from helper cells
    for i in range(26, 29):
        L = i - 25
        for j in range(1, 4):
            c = ws.cell(row=i, column=1 + j, value=f'={L}*{j}')
            c.alignment = CENTER; c.border = BOX; c.font = font(bold=True)
    grid = 'B26:D28'
    ws.conditional_formatting.add(grid, FormulaRule(formula=['B26>=$C$14'], fill=PatternFill('solid', fgColor='F8D7DA'), font=Font(name=F, bold=True, color='9C1C28')))
    ws.conditional_formatting.add(grid, FormulaRule(formula=['AND(B26>=$C$15,B26<$C$14)'], fill=PatternFill('solid', fgColor='FFE8B3'), font=Font(name=F, bold=True, color='7A4B00')))
    ws.conditional_formatting.add(grid, FormulaRule(formula=['B26<$C$15'], fill=PatternFill('solid', fgColor='D9F2E3'), font=Font(name=F, bold=True, color='1D6B3A')))
    # Summary counts from the register (exclude the EX format row)
    ws['A31'] = 'Summary of 3 Risk Register'; ws['A31'].font = font(bold=True, size=11, color=NAVY)
    for j, h in enumerate(['Risk level', 'All risks', 'Still open', 'Done', 'Accepted'], start=1):
        c = ws.cell(row=32, column=j, value=h); c.font = font(bold=True, color='FFFFFF'); c.fill = PatternFill('solid', fgColor='1B6FA8'); c.border = BOX; c.alignment = CENTER
    reg = "'3 Risk Register'"
    J = f"{reg}!$J$5:$J${reg_last}"; A = f"{reg}!$A$5:$A${reg_last}"; N = f"{reg}!$N$5:$N${reg_last}"
    for i, lvl in enumerate(['High', 'Medium', 'Low'], start=33):
        body_cell(ws, i, 1, lvl).font = font(bold=True)
        ws.cell(row=i, column=2, value=f'=COUNTIFS({J},$A{i},{A},"<>EX")')
        ws.cell(row=i, column=3, value=f'=COUNTIFS({J},$A{i},{A},"<>EX",{N},"Open")+COUNTIFS({J},$A{i},{A},"<>EX",{N},"In progress")')
        ws.cell(row=i, column=4, value=f'=COUNTIFS({J},$A{i},{A},"<>EX",{N},"Done")')
        ws.cell(row=i, column=5, value=f'=COUNTIFS({J},$A{i},{A},"<>EX",{N},"Accepted risk")')
    body_cell(ws, 36, 1, 'Total').font = font(bold=True)
    for col in 'BCDE':
        ws[f'{col}36'] = f'=SUM({col}33:{col}35)'
    for r in range(33, 37):
        for col in 'BCDE':
            c = ws[f'{col}{r}']; c.alignment = CENTER; c.border = BOX; c.font = font(bold=(r == 36)); c.number_format = '0'
    ws['A38'] = '"Still open" counts Open and In progress. Accepted risk means the practice has documented a decision not to act further.'
    ws['A38'].font = font(italic=True, color='44546A', size=9); ws.merge_cells('A38:F38')
    setup_print(ws, landscape=False)

def build(example, path):
    wb = Workbook()
    start_sheet(wb, example)
    scope_sheet(wb, example)
    table_sheet(wb, '2 ePHI Inventory', '2  ePHI inventory',
                'Every system, device, cloud service and backup that stores or sends electronic patient information, and who supports it.',
                INV_HEAD, INV_W, INV_EXAMPLE, INV_FORMAT_ROW, example, inventory_extra)
    ws, reg_last = table_sheet(wb, '3 Risk Register', '3  Risk register',
                'One row per threat and vulnerability. Rate likelihood and impact 1 to 3; the score and level calculate. Every risk gets an action, an owner and a date.',
                REG_HEAD, REG_W, REG_EXAMPLE, REG_FORMAT_ROW, example, register_extra)
    matrix_sheet(wb, reg_last)
    table_sheet(wb, '5 Review Log', '5  Review log',
                'Each time the assessment is reviewed or updated, record why, who did it and what changed.',
                LOG_HEAD, LOG_W, LOG_EXAMPLE, LOG_FORMAT_ROW, example, log_extra)
    wb.properties.title = 'HIPAA Security Risk Assessment ' + ('Example' if example else 'Template')
    wb.properties.creator = 'SecureTrust Cyber'
    wb.properties.subject = 'HIPAA Security Rule risk analysis'
    wb.active = 0
    wb.save(path)

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '.'
    build(False, f'{out}/securetrust-hipaa-risk-assessment-template.xlsx')
    build(True, f'{out}/securetrust-hipaa-risk-assessment-example.xlsx')
    print('built')
