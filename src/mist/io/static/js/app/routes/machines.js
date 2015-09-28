define('app/routes/machines', ['app/routes/base'],
    //
    //  Machines Route
    //
    //  @returns Class
    //
    function (BaseRoute) {

        'use strict';

        return App.MachinesRoute = BaseRoute.extend({

            documentTitle: 'mist.io - machines',

            exit: function() {
                Mist.backendsController.model.forEach(function(backend) {
                    backend.machines.model.setEach('selected', false);
                });
            }
        });
    }
);
