var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'pat4b3gG0tow4cdAx.349ea6884fa7508315b49c77e526b09da8b8adee865d5c812da1abc09a3977ed' }).base('app5fvZeeyGvPdZdH');

base('SL_FOOD').select({
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {

            const container = document.getElementById('card-container');
            const item = document.createElement('div');
            item.className = 'card';

            const cardInfo = document.createElement('div');
            cardInfo.className = 'card-info';

            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            if (record.fields['是否輸出'] === true) {
                cardContent.innerHTML = `
            <h3>${record.fields['品名'] || '未提供'}</h3>
            <p><strong>原料:</strong> ${record.fields['原料'] ? record.fields['原料'].join(', ') : '未提供'}</p>
            <p><strong>有效期限:</strong> ${record.fields['有效期限'] || '未提供'}</p>
            <p><strong>產地:</strong> ${record.fields['產地'] || '未提供'}</p>
            <p><strong>注意事項:</strong> ${record.fields['注意事項'] || '未提供'}</p>
            <p><strong>代理商:</strong> ${record.fields['代理商'] || '未提供'}</p>
            <p><strong>地址:</strong> ${record.fields['地址'] || '未提供'}</p>
            <p><strong>電話:</strong> ${record.fields['電話'] || '未提供'}</p>
        `;
                cardInfo.appendChild(cardContent);
                item.appendChild(cardInfo);
                container.appendChild(item);

                const nutritionLabelId = record.fields['營養標示'][0];
                base('NUTRITION_LABELING').find(nutritionLabelId, function(err, relatedRecord) {
                    if (err) { console.error(err); return; }
                    const nutritionInfo = document.createElement('div');
                    nutritionInfo.className = 'card-table';
                    nutritionInfo.innerHTML = `
            <table class="table table-NutritionLabel">
                <thead>
                    <tr>
                        <th colspan="3">營養標示</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2" class="col-xs-4 col-sm-3">每一份量</td>
                        <td class="col-xs-8 col-sm-9"><span>${relatedRecord.fields['每一份量'] || '未提供'}</span> <span>公克</span></td>
                    </tr>
                    <tr>
                        <td colspan="2" class="col-sm-3">本包裝含</td>
                        <td class="col-sm-9"><span>${relatedRecord.fields['本包裝含'] || '未提供'}</span> 份</td>
                    </tr>
                </tbody>
            </table>
            <table class="table text-right table-NutritionLabel">
                <tbody>
                    <tr>
                        <td class="col-xs-4 col-sm-3"></td>
                        <td class="col-xs-4 col-sm-3">每份</td>
                        <td class="col-xs-4 col-sm-3">每 100 <span>公克</span></td>
                    </tr>
                    <tr>
                        <td class="text-left">熱量</td>
                        <td><span>${relatedRecord.fields['熱量 (每份)'] || '未提供'}</span> 大卡</td>
                        <td><span>${relatedRecord.fields['熱量 (每 100 公克)'] || '未提供'}</span> 大卡</td>
                    </tr>
                    <tr>
                        <td class="text-left">蛋白質</td>
                        <td><span>${relatedRecord.fields['蛋白質 (每份)'] || '未提供'}</span> 公克</td>
                        <td><span>${relatedRecord.fields['蛋白質 (每 100 公克)'] || '未提供'}</span> 公克</td>
                    </tr>
                    <tr>
                        <td class="text-left">脂肪</td>
                        <td><span>${relatedRecord.fields['脂肪 (每份)'] || '未提供'}</span> 公克</td>
                        <td><span>${relatedRecord.fields['脂肪 (每 100 公克)'] || '未提供'}</span> 公克</td>
                    </tr>
                    <tr>
                        <td class="text-left">&nbsp;&nbsp;&nbsp;&nbsp;飽和脂肪</td>
                        <td><span>${relatedRecord.fields['飽和脂肪 (每份)'] || '未提供'}</span> 公克</td>
                        <td><span>${relatedRecord.fields['飽和脂肪 (每 100 公克)'] || '未提供'}</span> 公克</td>
                    </tr>
                    <tr>
                        <td class="text-left">&nbsp;&nbsp;&nbsp;&nbsp;反式脂肪</td>
                        <td><span>${relatedRecord.fields['反式脂肪 (每份)'] || '未提供'}</span> 公克</td>
                        <td><span>${relatedRecord.fields['反式脂肪 (每 100 公克)'] || '未提供'}</span> 公克</td>
                    </tr>
                    <tr>
                        <td class="text-left">碳水化合物</td>
                        <td><span>${relatedRecord.fields['碳水化合物 (每份)'] || '未提供'}</span> 公克</td>
                        <td><span>${relatedRecord.fields['碳水化合物 (每 100 公克)'] || '未提供'}</span> 公克</td>
                    </tr>
                    <tr>
                        <td class="text-left">&nbsp;&nbsp;&nbsp;糖</td>
                        <td><span>${relatedRecord.fields['糖 (每份)'] || '未提供'}</span> 公克</td>
                        <td><span>${relatedRecord.fields['糖 (每 100 公克)'] || '未提供'}</span> 公克</td>
                    </tr>
                    <tr>
                        <td class="text-left">鈉</td>
                        <td><span>${relatedRecord.fields['鈉 (每份)'] || '未提供'}</span> 毫克</td>
                        <td><span>${relatedRecord.fields['鈉 (每 100 公克)'] || '未提供'}</span> 毫克</td>
                    </tr>
                </tbody>
            </table>
            `;
                    cardInfo.appendChild(nutritionInfo);
                });
            }
        });

        fetchNextPage();

    },
    function done(err) {
        if (err) { console.error(err); return; }
    });