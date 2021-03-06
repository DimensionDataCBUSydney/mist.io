define('app/views/script_run', ['app/views/popup'],
    //
    //  Script Run View
    //
    //  @returns Class
    function (PopupComponent) {

        'use strict';

        return App.ScriptRunComponent = PopupComponent.extend({

            layoutName: 'script_run',
            controllerName: 'scriptRunController',
            popupId: '#script-run',

            isReady: function () {
                return Mist.scriptRunController.scriptToRun.machine.id;
            }.property('Mist.scriptRunController.scriptToRun.machine'),

            //
            //  Actions
            //

            actions: {
                machineClicked: function (machine) {
                    Mist.scriptRunController.get('scriptToRun').set('machine', machine);
                    $('#script-run-machine').collapsible('collapse');
                },
                backClicked: function () {
                    Mist.scriptRunController.close();
                },
                runClicked: function () {
                    Mist.scriptRunController.run();
                }
            }
        });
    }
);
