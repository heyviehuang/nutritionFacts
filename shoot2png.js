var shotit = function() {
    // 使用 map 函數將每個 .card 元素的截圖處理過程轉換為一個 promise 陣列
    var promises = Array.from(document.querySelectorAll('.card')).map(function(card) {
        return html2canvas(card).then(function(canvas) {
            // 將每個 canvas 轉換成 dataURL
            return canvas.toDataURL("image/png");
        });
    });

    // 等待所有的截圖 promise 完成
    Promise.all(promises).then(function(images) {
        // 所有的截圖都完成後，開啟一個新分頁
        var newTab = window.open();
        // 寫入所有的截圖到新分頁
        newTab.document.write('<html><body>');
        images.forEach(function(img) {
            newTab.document.write('<img style="margin: 10px;" src="' + img + '" alt="截圖圖片"/>');
        });
        newTab.document.write('</body></html>');
        newTab.document.close(); // 確保新分頁的文檔已完全寫入並關閉
    });
};