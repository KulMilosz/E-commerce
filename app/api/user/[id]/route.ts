import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;



    const mockUser = {
      id,
      firstName: 'John',
      email: 'john.doe@example.com',
      orders: [
        {
          id: 'order1',
          createdAt: '2024-01-15T10:30:00Z',
          status: 'DELIVERED',
          totalAmount: 125.96
        },
        {
          id: 'order2',
          createdAt: '2024-01-20T14:15:00Z',
          status: 'PENDING',
          totalAmount: 49.99
        }
      ]
    };

    return NextResponse.json(mockUser);
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
