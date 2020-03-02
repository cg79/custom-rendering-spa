var roll = (function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var SpaRender = /** @class */ (function () {
        function SpaRender() {
            var _this = this;
            this.data = null;
            this.textToHtmlText = function (text, data) {
                var props = text.match(/(\{)(.*?)(\})/gi);
                if (!props) {
                    return text;
                }
                var pName = '';
                props.forEach(function (p) {
                    pName = p.replace('{', '').replace('}', '');
                    text = text.replace(p, data[pName]);
                });
                return text;
            };
            this.insertElement = function (parentId, template, data) {
                _this.data = data;
                var htmlText = _this.textToHtmlText(template, data);
                var parent = document.getElementById(parentId);
                if (!parent) {
                    console.warn('no parent for ', parentId);
                    return null;
                }
                parent.insertAdjacentHTML('beforeend', htmlText);
                var lastChild = parent.lastChild;
                if (!lastChild) {
                    return null;
                }
                return lastChild.previousSibling;
            };
            this.assignEv = function (id, evName, func) {
                var htmlElement = null;
                var exec = function (el) { return func(el, id); };
                htmlElement = document.getElementById(id);
                if (!htmlElement) {
                    throw new Error("no html element for " + id);
                }
                htmlElement.addEventListener(evName, function (element) {
                    exec(element);
                });
                return _this;
            };
            this.assignChildNodeEv = function (childNode, evName, func) {
                var exec = function (el) { debugger; func(el); };
                // htmlElement = document.getElementById( id );
                // if ( !htmlElement ) {
                //     throw new Error( `no html element for ${ id }` );
                // }
                childNode.addEventListener(evName, function (element) {
                    debugger;
                    exec(element);
                });
                childNode[evName] = function (el) {
                    debugger;
                    exec(el);
                };
                return _this;
            };
            this.mapClass = function (id, orig, propName) {
                var htmlElement = null;
                htmlElement = document.getElementById(id);
                if (!htmlElement) {
                    throw new Error("no html element for " + id);
                }
                htmlElement.setAttribute("class", orig + " " + _this.data[propName]);
                return _this;
            };
        }
        SpaRender.prototype.removeElement = function (id) {
            var htmlElement = document.getElementById(id);
            if (!htmlElement) {
                throw new Error("no html element for " + id);
            }
            return htmlElement.parentNode.removeChild(htmlElement);
        };
        return SpaRender;
    }());

    var BaseSpaComponent = /** @class */ (function () {
        function BaseSpaComponent() {
            this.spaRenderer = new SpaRender();
        }
        return BaseSpaComponent;
    }());

    var SpaComponent = /** @class */ (function (_super) {
        __extends(SpaComponent, _super);
        function SpaComponent() {
            var _this = _super.call(this) || this;
            _this.node = null;
            _this._template = "\n        <label>\n        tttttttttttttttttttttttt\n        </label>\n    ";
            _this.events = {};
            return _this;
        }
        SpaComponent.prototype.model = function (model) {
            this._model = model;
            return this;
        };
        SpaComponent.prototype.template = function (template) {
            this._template = template;
            return this;
        };
        SpaComponent.prototype.event = function (eventName, func) {
            this.events[eventName] = func;
            return this;
        };
        SpaComponent.prototype.render = function () {
            debugger;
            var _a = this, events = _a.events, spaRenderer = _a.spaRenderer;
            var node = spaRenderer.insertElement('a', this._template, this._model);
            if (!node) {
                return;
            }
            this.node = node;
            var func = null;
            Object.keys(events).forEach(function (ev) {
                debugger;
                func = events[ev];
                spaRenderer.assignChildNodeEv(node, ev, func);
            });
            return this;
        };
        SpaComponent.prototype.setValue = function (val) {
            if (!this.node) {
                return;
            }
            this.node['value'] = val;
        };
        SpaComponent.prototype.getValue = function () {
            if (!this.node) {
                return null;
            }
            return this.node['value'];
        };
        SpaComponent.prototype.asInt = function () {
            var v = this.getValue();
            return v ? parseInt(v) : 0;
        };
        return SpaComponent;
    }(BaseSpaComponent));

    // import { SpaLabel } from './components/SpaLabel';
    var SpaView = /** @class */ (function () {
        function SpaView(model) {
            this.model = model;
            // this.renderer = new SpaRender();
        }
        SpaView.prototype.render = function () {
            return "j";
        };
        return SpaView;
    }());

    var SpaLib = /** @class */ (function () {
        function SpaLib() {
            this.components = {};
            window['spalib'] = this;
            // this.page = new SpaPage();
            this.spaRenderer = new SpaRender();
        }
        SpaLib.prototype.includeView = function () {
            return new SpaView({});
        };
        SpaLib.prototype.component = function () {
            return new SpaComponent();
        };
        SpaLib.prototype.addComponent = function (name, component) {
            this.components[name] = component;
        };
        return SpaLib;
    }());
    var SpaLib$1 = new SpaLib();

    var IComponentEvent;
    (function (IComponentEvent) {
        IComponentEvent["click"] = "onclick";
        IComponentEvent["mouseover"] = "onmouseover";
        IComponentEvent["mouseenter"] = "mouseenter";
        IComponentEvent["mouseleave"] = "mouseleave";
    })(IComponentEvent || (IComponentEvent = {}));

    var HomeComponent = /** @class */ (function (_super) {
        __extends(HomeComponent, _super);
        function HomeComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.mydata = {
                id: 'xxx',
                id1: 'yyy',
                btnFunc: function (v1, v2) {
                    debugger;
                    console.log(v1, v2);
                    return v1 + v2;
                },
                mover: function (val, v2) {
                    console.log(val);
                },
                list: [{ id: '1a', name: 'john' }, { id: '2a', name: 'ionela' }],
                text: "hello dinamic button"
            };
            return _this;
        }
        HomeComponent.prototype.render = function () {
            var _this = this;
            var y = SpaLib$1.component()
                .template("\n\t\t\t<input type=\"text\">\n\t\t\t")
                .model(this.mydata)
                .event(IComponentEvent.mouseover, this.mydata.mover)
                .render();
            var z = SpaLib$1.component()
                .template("\n\t\t\t<input type=\"text\">\n\t\t\t")
                .model(this.mydata)
                .render();
            var x = SpaLib$1.component()
                .template("\n\t\t\t\t<button>{id1}</button>\n\t\t\t")
                .model(this.mydata)
                .event(IComponentEvent.click, function (ev) {
                debugger;
                var v1 = y.asInt();
                var v2 = z.asInt();
                var v3 = _this.mydata.btnFunc(v1, v2);
                total.setValue(v3);
                console.log(v3);
            })
                .render();
            var total = SpaLib$1.component()
                .template("\n\t\t\t<input type=\"text\">\n\t\t\t")
                .model(this.mydata)
                .event(IComponentEvent.mouseover, this.mydata.mover)
                .render();
        };
        return HomeComponent;
    }(SpaComponent));

    var HomeModule = /** @class */ (function () {
        function HomeModule() {
            var homeComponent = new HomeComponent();
            SpaLib$1.addComponent('home', homeComponent);
        }
        return HomeModule;
    }());
    var HomeModule$1 = new HomeModule();

    return HomeModule$1;

}());
