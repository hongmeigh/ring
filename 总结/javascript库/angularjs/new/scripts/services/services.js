App.factory('homeService', function($resource)
    {      
        var serviceUrl = ERPServiceUrl.getService('home').url;
        var homeItems = $resource(serviceUrl, {}, {
            query: { method: 'POST' },
            queryStatus:{
                url: ERPServiceUrl.getService('home').url+"/:dataid",
                method: 'GET',
                params:{
                    dataid : "@dataid"
                }
            }

        })
        return homeItems;
    })
.value('version', '1.0');