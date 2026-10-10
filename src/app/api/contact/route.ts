import { NextRequest, NextResponse } from 'next/server';
import { ContactModel } from '@/models/contact.model';
import { ContactLead } from '@/models/types';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fullName, email, serviceRequired, projectDetails, companyName, phoneNumber, budgetRange } = body;

    // Validation
    if (!fullName || !email || !serviceRequired || !projectDetails) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide all required fields (Name, Email, Service, and Details).',
        },
        { status: 400 }
      );
    }

    const leadData: ContactLead = {
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      companyName: companyName ? String(companyName).trim() : undefined,
      phoneNumber: phoneNumber ? String(phoneNumber).trim() : undefined,
      serviceRequired: String(serviceRequired),
      budgetRange: budgetRange ? String(budgetRange) : 'Flexible',
      projectDetails: String(projectDetails).trim(),
      status: 'NEW',
    };

    const result = await ContactModel.create(leadData);

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been logged successfully.',
        leadId: result.id,
        savedToMysql: result.savedToMysql,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API /api/contact error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error processing contact submission.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await ContactModel.findAll();
    return NextResponse.json({
      success: true,
      count: result.leads.length,
      source: result.source,
      leads: result.leads,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Could not fetch leads.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
