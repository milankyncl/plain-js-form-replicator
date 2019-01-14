
/**
 * PlainJS Form Replicator
 * -----------------------
 * @author Milan Kyncl <kontakt@milankyncl.cz>
 * @package plain-js-form-replicator
 * @licence MIT
 */


'use strict';

var FormReplicator = FormReplicator || {};

FormReplicator.init = function (element, groupName, settings) {

    if(element === undefined || element === null) {
        console.warn('FormReplicator: Provided element isn\'t valid.');
        return false;
    }

    if(groupName === undefined || groupName === null) {
        console.warn('FormReplicator: Group name must be specified.');
        return false;
    }

    /**
     * Resolve settings
     */

    if(settings === undefined) settings = {};
    if(settings.firstItemUndeletable === undefined) settings.firstItemUndeletable = true;
    if(settings.onHide === undefined) settings.onHide = function(item) { item.style.display = 'none' };
    if(settings.onShow === undefined) settings.onShow = function(item) { item.style.display = 'block' };


    /**
     * Now the plugin core
     */

    var groupItems = element.querySelectorAll('[data-group-item]');
    var addGroupItem = element.querySelector('[data-group-add-item]');
    var index = 0;

    /**
     * Create template
     */

    var template = groupItems.item(0).cloneNode(true);

    /**
     * Parse inputs, selects, textareas in group
     */

    groupItems.forEach(function(item, _i) {

        if(settings.firstItemUndeletable && _i === 0)
            item.querySelector('[data-group-remove-item]').style.display = 'none';

        item.querySelectorAll('select, input, textarea').forEach(function(field) {

            field.setAttribute('name', groupName + '[' + _i + '][' + field.getAttribute('name') + ']')
        });

        item.querySelector('[data-group-remove-item]').addEventListener('click', function(e) {

            e.preventDefault();

            settings.onHide(item);

        });

        index++;
    });

    /**
     * Cloning items
     */

    if(addGroupItem !== undefined) {

        addGroupItem.addEventListener('click', function(e) {

            e.preventDefault();

            var inner = element.querySelector('[data-group-inner]');

            if(inner !== undefined) {

                var newItem = template.cloneNode(true);

                newItem.classList.add('clone');
                newItem.querySelectorAll('select, input, textarea').forEach(function(newItemField) {

                    newItemField.setAttribute('name', groupName + '[' + index + '][' + newItemField.getAttribute('name') + ']');
                    newItemField.value = '';

                });

                newItem.querySelector('[data-group-remove-item]').addEventListener('click', function(e) {

                    e.preventDefault();

                    settings.onHide(newItem);
                });

                newItem.style.display = 'none';

                inner.appendChild(newItem);

                settings.onShow(newItem);

                index++;
            }

        });
    }

};

