/*100元商品名標籤*/

var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'pat4b3gG0tow4cdAx.349ea6884fa7508315b49c77e526b09da8b8adee865d5c812da1abc09a3977ed' }).base('app5fvZeeyGvPdZdH');

base('PRODUCT_NAME').select({
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {

            const container = document.getElementById('cardInfo');
            const item = document.createElement('div');
            item.className = 'card';

            const cardInfo = document.createElement('div');
            cardInfo.className = 'card-info';

            if (record.fields['是否輸出'] === true) {
                cardInfo.innerHTML = `
            <h3>${record.fields['品名'] || '未提供'}</h3>
            <h4>${record.fields['副標'] || ' '}</h4>
        `;
                item.appendChild(cardInfo);
                container.appendChild(item);
            }
        });

        fetchNextPage();

    },
    function done(err) {
        if (err) { console.error(err); return; }
    });