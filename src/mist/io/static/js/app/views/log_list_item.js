define('app/views/log_list_item', ['app/views/list_item'],
    //
    //  Log List Item View
    //
    //  @returns Class
    //
    function (ListItemComponent) {

        'use strict';

        return App.LogListItemComponent = ListItemComponent.extend({

            //
            //  Properties
            //

            layoutName: 'log_list_item',
            log: null,
            tagName: 'li',
            isCollapsed: true,


            //
            //  Computed Properties
            //

            details: function () {
                var details = [];
                forIn(this.log, function (value, property) {
                    if (property == 'time')
                        return;
                    if (value !== undefined && value !== null)
                        details.push({
                            key: property,
                            value: value instanceof Object ? JSON.stringify(value) : value
                        });
                })
                return details.sort(function (a, b) {
                    if (a.key > b.key)
                        return 1;
                    if (a.key < b.key)
                        return -1;
                    return 0;
                });
            }.property('log'),

            collapsedClass: function () {
                return this.get('isCollapsed') ? '' : 'open';
            }.property('isCollapsed'),

            prettyTime: function () {
                return this.get('log').get('date') && this.get('log').get('date').getTimeFromNow();
            }.property('log.time'),

            fullPrettyTime: function () {
                return this.get('log').get('date') && this.get('log').get('date').getPrettyDateTime();
            }.property('log.time'),

            formatedAction: function () {
                return this.get('log').get('action').split('_').map(function (word) {
                    return word.capitalize();
                }).join(' ');
            }.property('log.action'),

            filteredEmail: function () {
                var email = this.get('log').get('email');
                return email !== 'None' ? email : '';
            }.property('log.email'),

            isIncident: function () {
                return this.get('log').get('type') == 'incident';
            }.property('log.type'),

            backendTitle: function () {
                var log = this.get('log');
                var backendId = log.get('backend_id');
                if (Mist.backendsController && Mist.backendsController.backendExists(backendId))
                    return Mist.backendsController.getBackend(backendId).title;
                return false;
            }.property('log.backend_id'),

            machineLink: function () {
                var log = this.get('log');
                var backendId = log.get('backend_id');
                var machineId = log.get('machine_id');
                return Mist.backendsController && Mist.backendsController.getMachine(machineId, backendId);
            }.property('log.machine_id'),

            showEmail: function () {
                return Mist.logs.namespace == 'manage_logs';
            }.property(),


            //
            //  Actions
            //

            actions: {
                toggleCollapse: function () {
                    this.propertyDidChange('machineLink');
                    if (this.get('isCollapsed')) {
                        this.set('isCollapsed', false);
                        Ember.run.next(this, function () {
                            this.$('.details').slideDown();
                        });
                    } else {
                        var that = this;
                        Ember.run.next(this, function(){
                            this.$('.details').slideUp(function () {
                               that.set('isCollapsed', true);
                            });
                        });
                    }
                },

                userClicked: function (user) {
                    Mist.__container__.lookup('router:main').transitionTo('user',
                        Mist.usersController.getUser(
                            this.get('log').get('email')
                        )
                    );
                }
            }
        });
    }
);
