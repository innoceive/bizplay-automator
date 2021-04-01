chrome.action.onClicked.addListener(async (tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            const checkRow = (row) => row.parentNode.querySelectorAll("input[type=checkbox]").item(0).setAttribute("checked", true)
            const getNode = (element) => element.childNodes.item(0).childNodes.item(0);
            const parseAmount = (node) => node.childNodes.item(0).textContent.substring(1);
            const getAmount = (element) => element.childNodes.item(0).textContent;
            const amounts = document.getElementById("ifrm_page").contentWindow.document.getElementById("tableList").querySelectorAll("tbody tr.bg_valuenull td:nth-child(8)");

            let toCheck = null
            amounts.forEach((element) => {
                const node = getNode(element);
                if (node.childNodes.length > 0) {
                    toCheck = parseAmount(node);
                    checkRow(element)
                } else if (getAmount(element) == toCheck) {
                    checkRow(element)
                    toCheck = null;
                }
            });

            if (toCheck != null) {
                alert("합산이 0이 아닙니다. \n확인해주세요.")
            }
        }
    });
});

