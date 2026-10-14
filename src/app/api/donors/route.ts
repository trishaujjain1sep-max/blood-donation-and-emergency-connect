import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bloodGroup = searchParams.get('blood_group');
    const city = searchParams.get('city');

    let query = supabase.from('donors').select('*');

    if (bloodGroup) {
      query = query.eq('blood_group', bloodGroup);
    }

    if (city) {
      query = query.ilike('city', `%${city}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ donors: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch donors' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, age, gender, blood_group, city, phone, last_donation } = body;

    if (!name || !age || !gender || !blood_group || !city || !phone) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('donors')
      .insert([
        {
          name,
          age: parseInt(age),
          gender,
          blood_group,
          city,
          phone,
          last_donation: last_donation || null,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ donor: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create donor' },
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
        { error: 'Donor ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('donors')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ donor: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update donor' },
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
        { error: 'Donor ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('donors').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete donor' },
      { status: 500 }
    );
  }
}
