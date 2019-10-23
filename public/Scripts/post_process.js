    // submit function
    function sw_add_order() {
        let data = {
            "cenid": $('#cenid').val(),
            "foodid": $('#foodid').val(),
            "quantity": $('#quantity').val(),
            "status": $('#status').val()
        }
        // send message to service worker via postMessage
        let msg = {
            'form_data': data
        }
        // send data to sw_cached_site.j
        navigator.serviceWorker.controller.postMessage(msg)
        return true;
     }