// ESM compatible verification script
// Use native fetch (Node 18+)

async function test() {
    console.log('Starting verification...');
    try {
        // 1. Search Results
        const searchUrl = 'http://localhost:3000/api/searchResults?city=New%20York';
        console.log(`Fetching ${searchUrl}`);
        const resSearch = await fetch(searchUrl);
        if (!resSearch.ok) throw new Error(`Search failed: ${resSearch.status}`);
        const searchData = await resSearch.json();

        console.log(`Found ${searchData.length} hotels in New York`);
        const firstHotel = searchData[0];
        console.log('First Hotel:', firstHotel);

        // Verify ID format: 4 digit number
        if (!/^\d{4}$/.test(firstHotel.id)) {
            throw new Error(`Invalid ID format: ${firstHotel.id}. Expected 4 digits.`);
        }

        // 2. Hotel Details
        // Encode space in ID just to be safe, though fetch usually handles it
        const detailUrl = `http://localhost:3000/api/hotelDetails?hotelId=${encodeURIComponent(firstHotel.id)}`;
        console.log(`Fetching ${detailUrl}`);
        const resDetail = await fetch(detailUrl);
        if (!resDetail.ok) throw new Error(`Details failed: ${resDetail.status}`);
        const detailData = await resDetail.json();

        console.log('Detail Data:', detailData);

        // Verify consistency
        if (detailData.name !== firstHotel.name) {
            throw new Error(`Name mismatch: ${detailData.name} vs ${firstHotel.name}`);
        }
        if (detailData.id !== firstHotel.id) {
            throw new Error(`ID mismatch: ${detailData.id} vs ${firstHotel.id}`);
        }

        console.log('VERIFICATION PASSED');
    } catch (e) {
        console.error('VERIFICATION FAILED');
        console.error(e);
        process.exit(1);
    }
}

test();
