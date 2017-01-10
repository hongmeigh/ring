var ERPServiceUrl = (function () {
   
    var _HOST_PROD ="https://www.tpooo.com/";
    var _HOST_TEST ="https://www.tpooo.com/";
    var _mode = "TEST"
    var _config = {
        TEST: {
            home: {
                url: _HOST_TEST + "api/test1"
            }
        },
        PROD: {
            home: {
                url: _HOST_PROD + "api/test"
            }
        }
    };

    return {
        setMode: function (mode) {
            _mode = mode;
            
        },

        getMode: function () {
            return _mode;
        },

        getService: function (svc) {
            switch (svc) {
                case "home":
                    return _config[_mode][svc];
            }
        }
    };    
})();


