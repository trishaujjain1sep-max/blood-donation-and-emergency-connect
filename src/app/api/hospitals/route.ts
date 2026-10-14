import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    let query = supabase.from('hospitals').select('*');

    if (city) {
      query = query.ilike('city', `%${city}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ hospitals: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch hospitals' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, city, contact, emergency_services } = body;

    if (!name || !city || !contact) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('hospitals')
      .insert([
        {
          name,
          city,
          contact,
          emergency_services: emergency_services ?? true,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ hospital: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create hospital' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Hospital ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('hospitals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ hospital: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update hospital' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Hospital ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('hospitals').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete hospital' },
      { status: 500 }
    );
  }
}
