// ESM compatible verification script for Booking
// Use native fetch (Node 18+)

async function testBooking() {
    console.log('Starting booking verification...');
    const url = 'http://localhost:3000/api/bookHotel';

    const payload = {
        hotelId: '1001',
        user: {
            name: 'John Doe',
            email: 'john@example.com'
        },
        checkIn: '2023-12-25',
        checkOut: '2023-12-30',
        guests: 2,
        price: 500,
        currency: 'USD'
    };

    try {
        console.log(`Sending POST to ${url}`);
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Booking failed: ${res.status} - ${text}`);
        }

        const data = await res.json();
        console.log('Response:', data);

        if (data.message !== 'Booking successful' || !data.bookingId) {
            throw new Error('Invalid response structure');
        }

        if (!data.bookingId.startsWith('BK_')) {
            throw new Error(`Invalid booking ID format: ${data.bookingId}`);
        }

        console.log('VERIFICATION PASSED');
    } catch (e) {
        console.error('VERIFICATION FAILED');
        console.error(e);
        process.exit(1);
    }
}

testBooking();
