import { NextResponse } from 'next/server';
import * as nodemailerNS from 'nodemailer';
const nodemailer = (nodemailerNS as any).default ?? nodemailerNS;
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  pool: true,         
  maxConnections: 3,
  maxMessages: 100,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, propertySize, issue } = body;

    let basePrice = 89;
    if (propertySize === '1500_3000') basePrice = 129;
    if (propertySize === 'over_3000') basePrice = 189;
    if (propertySize === 'commercial') basePrice = 299;

    const issueFormatting: Record<string, string> = {
      general: 'General Prevention Plan',
      ants: 'Targeted Ant & Roach Eradication',
      rodents: 'Rodent Exclusion & Monitoring',
      wasps: 'Wasp & Hornet Hive Removal',
      other: 'Custom Diagnostic Treatment',
    };

    const propertyLabel: Record<string, string> = {
      under_1500: 'Under 1,500 sq ft',
      '1500_3000': '1,500 – 3,000 sq ft',
      over_3000: 'Over 3,000 sq ft',
      commercial: 'Commercial Property',
    };

    // --- Quotation metadata ---
    const quoteNumber = `NG-${Date.now().toString().slice(-8)}`;
    const issueDate = new Date();
    const validUntil = new Date(issueDate);
    validUntil.setDate(validUntil.getDate() + 14);

    const formatDate = (d: Date) =>
      d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // --- Line items (mock breakdown for realism) ---
    const serviceLine = issueFormatting[issue] || 'Custom Treatment';
    const inspectionFee = 0; // included
    const treatmentFee = basePrice;
    const subtotal = inspectionFee + treatmentFee;
    const total = subtotal; // no tax logic mocked in; add if needed

    const htmlTemplate = `
      <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 640px; margin: 0 auto; border: 1px solid #d1d5db; background-color: #ffffff; color: #171717;">
        
        <!-- Letterhead -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom: 3px solid #166534;">
          <tr>
            <td style="padding: 28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="top">
                    <div style="font-family: sans-serif; font-size: 22px; font-weight: 900; color: #171717;">
                      NestGuard<span style="color: #166534;">.</span>
                    </div>
                    <div style="font-family: sans-serif; font-size: 11px; color: #6b7280; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 2px;">
                      Pest Control &amp; Prevention Services
                    </div>
                  </td>
                  <td valign="top" align="right">
                    <div style="font-family: sans-serif; font-size: 20px; font-weight: 700; color: #166534; text-transform: uppercase; letter-spacing: 0.05em;">
                      Quotation
                    </div>
                    <div style="font-family: sans-serif; font-size: 12px; color: #6b7280; margin-top: 2px;">
                      No. ${quoteNumber}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Body -->
        <div style="padding: 32px;">

          <!-- Bill To / Dates -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
            <tr>
              <td valign="top" width="55%" style="font-family: sans-serif;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; margin-bottom: 4px;">Prepared For</div>
                <div style="font-size: 15px; font-weight: 700; color: #171717;">${firstName} ${lastName}</div>
                <div style="font-size: 13px; color: #4b5563;">${email}</div>
              </td>
              <td valign="top" width="45%" align="right" style="font-family: sans-serif;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-left: auto; font-size: 13px;">
                  <tr>
                    <td style="color: #9ca3af; padding: 2px 12px 2px 0; text-align: right;">Date Issued:</td>
                    <td style="color: #171717; font-weight: 600; text-align: right;">${formatDate(issueDate)}</td>
                  </tr>
                  <tr>
                    <td style="color: #9ca3af; padding: 2px 12px 2px 0; text-align: right;">Valid Until:</td>
                    <td style="color: #171717; font-weight: 600; text-align: right;">${formatDate(validUntil)}</td>
                  </tr>
                  <tr>
                    <td style="color: #9ca3af; padding: 2px 12px 2px 0; text-align: right;">Property Type:</td>
                    <td style="color: #171717; font-weight: 600; text-align: right;">${propertyLabel[propertySize] || propertySize}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <p style="font-family: sans-serif; font-size: 14px; color: #4b5563; line-height: 1.6; margin-bottom: 24px;">
            Dear ${firstName}, thank you for your interest in our services. Please find below our formal quotation
            for pest control treatment based on the property details you provided. This quotation is valid for
            14 days from the date of issue.
          </p>

          <!-- Itemized table -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-family: sans-serif; margin-bottom: 4px;">
            <tr style="background-color: #166534;">
              <th align="left" style="padding: 10px 14px; font-size: 12px; color: #ffffff; text-transform: uppercase; letter-spacing: 0.03em;">Description</th>
              <th align="right" style="padding: 10px 14px; font-size: 12px; color: #ffffff; text-transform: uppercase; letter-spacing: 0.03em;">Amount</th>
            </tr>
            <tr>
              <td style="padding: 14px; font-size: 14px; border-bottom: 1px solid #e5e7eb; color: #171717;">
                <strong>${serviceLine}</strong><br/>
                <span style="font-size: 12px; color: #6b7280;">Flat-rate treatment scoped to ${propertyLabel[propertySize] || propertySize}</span>
              </td>
              <td align="right" style="padding: 14px; font-size: 14px; border-bottom: 1px solid #e5e7eb; color: #171717;">$${treatmentFee.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 14px; font-size: 14px; border-bottom: 1px solid #e5e7eb; color: #171717;">
                <strong>Initial Inspection</strong><br/>
                <span style="font-size: 12px; color: #6b7280;">Included with treatment booking</span>
              </td>
              <td align="right" style="padding: 14px; font-size: 14px; border-bottom: 1px solid #e5e7eb; color: #171717;">Included</td>
            </tr>
          </table>

          <!-- Totals -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family: sans-serif; margin-top: 4px;">
            <tr>
              <td width="60%"></td>
              <td width="40%">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 6px 14px; font-size: 13px; color: #6b7280;">Subtotal</td>
                    <td align="right" style="padding: 6px 14px; font-size: 13px; color: #171717;">$${subtotal.toFixed(2)}</td>
                  </tr>
                  <tr style="background-color: #F0FDF4;">
                    <td style="padding: 12px 14px; font-size: 15px; font-weight: 700; color: #166534; border-top: 2px solid #166534;">Total Estimate</td>
                    <td align="right" style="padding: 12px 14px; font-size: 18px; font-weight: 900; color: #166534; border-top: 2px solid #166534;">$${total.toFixed(2)}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Terms -->
          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-family: sans-serif;">
            <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; margin-bottom: 8px;">Terms &amp; Conditions</div>
            <ul style="font-size: 12px; color: #6b7280; line-height: 1.7; margin: 0; padding-left: 18px;">
              <li>This quotation is an estimate based on information provided and is subject to confirmation after an on-site inspection.</li>
              <li>Pricing is valid for 14 days from the date of issue (${formatDate(validUntil)}).</li>
              <li>Final pricing may vary depending on site conditions, infestation severity, and access requirements.</li>
              <li>No payment is due upon receipt of this quotation.</li>
            </ul>
          </div>

          <p style="font-family: sans-serif; font-size: 12px; color: #9ca3af; text-align: center; margin-top: 32px;">
            This is an automated demonstration document generated from a portfolio project. No actual services will be rendered.
          </p>
        </div>

        <!-- Footer -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #171717;">
          <tr>
            <td style="padding: 18px 32px; font-family: sans-serif; font-size: 11px; color: #9ca3af;" align="center">
              NestGuard Pest Control &nbsp;·&nbsp; Quotation ${quoteNumber} &nbsp;·&nbsp; Issued ${formatDate(issueDate)}
            </td>
          </tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"NestGuard Estimates" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Quotation ${quoteNumber} — NestGuard Estimate for ${firstName} ${lastName}`,
      html: htmlTemplate,
    });

    return NextResponse.json({ success: true, message: 'Quotation sent successfully', quoteNumber });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send quotation' }, { status: 500 });
  }
}