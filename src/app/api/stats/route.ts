import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Donor, Hospital } from '@/types';

export async function GET() {
  try {
    // Get total donors count
    const { count: totalDonors } = await supabase
      .from('donors')
      .select('*', { count: 'exact', head: true });

    // Get unique blood groups count
    const { data: bloodGroupsData } = await supabase
      .from('donors')
      .select('blood_group');

    const uniqueBloodGroups = new Set(bloodGroupsData?.map(d => d.blood_group) || []);
    const bloodGroups = uniqueBloodGroups.size;

    // Get hospitals count
    const { count: hospitals } = await supabase
      .from('hospitals')
      .select('*', { count: 'exact', head: true });

    // Get recent donors
    const { data: recentDonors } = await supabase
      .from('donors')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    // Get recent hospitals
    const { data: recentHospitals } = await supabase
      .from('hospitals')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    return NextResponse.json({
      totalDonors: totalDonors || 0,
      bloodGroups,
      hospitals: hospitals || 0,
      recentDonors: recentDonors || [],
      recentHospitals: recentHospitals || [],
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
