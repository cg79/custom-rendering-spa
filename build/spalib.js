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
            this.insertHtml = function (parentId, html) {
                var parent = document.getElementById(parentId);
                if (!parent) {
                    console.warn('no parent for ', parentId);
                    return null;
                }
                parent.insertAdjacentHTML('beforeend', html);
                var lastChild = parent.lastChild;
                if (!lastChild) {
                    return null;
                }
                return lastChild.previousSibling;
            };
            this.addHmlChild = function (node, htmlText) {
                if (!node) {
                    throw new Error('no node parent');
                }
                node.insertAdjacentHTML('beforeend', htmlText);
                var lastChild = node.lastChild;
                if (!lastChild) {
                    return null;
                }
                return lastChild.previousSibling;
            };
            this.addChild = function (node, template, data) {
                _this.data = data;
                var htmlText = _this.getHtml(template, data);
                node.insertAdjacentHTML('beforeend', htmlText);
                var lastChild = node.lastChild;
                if (!lastChild) {
                    return null;
                }
                return lastChild.previousSibling;
            };
            this.insertElement = function (parentId, template, data) {
                _this.data = data;
                var htmlText = _this.getHtml(template, data);
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
                var exec = function (el) { func(el); };
                // htmlElement = document.getElementById( id );
                // if ( !htmlElement ) {
                //     throw new Error( `no html element for ${ id }` );
                // }
                childNode.addEventListener(evName, function (element) {
                    exec(element);
                });
                childNode[evName] = function (el) {
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
        // getPropValue(propName) {
        // }
        SpaRender.prototype.getHtml = function (template, data) {
            return data ? this.textToHtmlText(template, data) : template;
        };
        SpaRender.prototype.removeElement = function (id) {
            var htmlElement = document.getElementById(id);
            if (!htmlElement) {
                throw new Error("no html element for " + id);
            }
            return htmlElement.parentNode.removeChild(htmlElement);
        };
        return SpaRender;
    }());

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isFunction(x) {
        return typeof x === 'function';
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var _enable_super_gross_mode_that_will_cause_bad_things = false;
    var config = {
        Promise: undefined,
        set useDeprecatedSynchronousErrorHandling(value) {
            if (value) {
                var error = /*@__PURE__*/ new Error();
                /*@__PURE__*/ console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
            }
            _enable_super_gross_mode_that_will_cause_bad_things = value;
        },
        get useDeprecatedSynchronousErrorHandling() {
            return _enable_super_gross_mode_that_will_cause_bad_things;
        },
    };

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function hostReportError(err) {
        setTimeout(function () { throw err; }, 0);
    }

    /** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
    var empty = {
        closed: true,
        next: function (value) { },
        error: function (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                hostReportError(err);
            }
        },
        complete: function () { }
    };

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var isArray = /*@__PURE__*/ (function () { return Array.isArray || (function (x) { return x && typeof x.length === 'number'; }); })();

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isObject(x) {
        return x !== null && typeof x === 'object';
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var UnsubscriptionErrorImpl = /*@__PURE__*/ (function () {
        function UnsubscriptionErrorImpl(errors) {
            Error.call(this);
            this.message = errors ?
                errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
            this.name = 'UnsubscriptionError';
            this.errors = errors;
            return this;
        }
        UnsubscriptionErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
        return UnsubscriptionErrorImpl;
    })();
    var UnsubscriptionError = UnsubscriptionErrorImpl;

    /** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_UnsubscriptionError PURE_IMPORTS_END */
    var Subscription = /*@__PURE__*/ (function () {
        function Subscription(unsubscribe) {
            this.closed = false;
            this._parentOrParents = null;
            this._subscriptions = null;
            if (unsubscribe) {
                this._unsubscribe = unsubscribe;
            }
        }
        Subscription.prototype.unsubscribe = function () {
            var errors;
            if (this.closed) {
                return;
            }
            var _a = this, _parentOrParents = _a._parentOrParents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
            this.closed = true;
            this._parentOrParents = null;
            this._subscriptions = null;
            if (_parentOrParents instanceof Subscription) {
                _parentOrParents.remove(this);
            }
            else if (_parentOrParents !== null) {
                for (var index = 0; index < _parentOrParents.length; ++index) {
                    var parent_1 = _parentOrParents[index];
                    parent_1.remove(this);
                }
            }
            if (isFunction(_unsubscribe)) {
                try {
                    _unsubscribe.call(this);
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
                }
            }
            if (isArray(_subscriptions)) {
                var index = -1;
                var len = _subscriptions.length;
                while (++index < len) {
                    var sub = _subscriptions[index];
                    if (isObject(sub)) {
                        try {
                            sub.unsubscribe();
                        }
                        catch (e) {
                            errors = errors || [];
                            if (e instanceof UnsubscriptionError) {
                                errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                            }
                            else {
                                errors.push(e);
                            }
                        }
                    }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        };
        Subscription.prototype.add = function (teardown) {
            var subscription = teardown;
            if (!teardown) {
                return Subscription.EMPTY;
            }
            switch (typeof teardown) {
                case 'function':
                    subscription = new Subscription(teardown);
                case 'object':
                    if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                        return subscription;
                    }
                    else if (this.closed) {
                        subscription.unsubscribe();
                        return subscription;
                    }
                    else if (!(subscription instanceof Subscription)) {
                        var tmp = subscription;
                        subscription = new Subscription();
                        subscription._subscriptions = [tmp];
                    }
                    break;
                default: {
                    throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
                }
            }
            var _parentOrParents = subscription._parentOrParents;
            if (_parentOrParents === null) {
                subscription._parentOrParents = this;
            }
            else if (_parentOrParents instanceof Subscription) {
                if (_parentOrParents === this) {
                    return subscription;
                }
                subscription._parentOrParents = [_parentOrParents, this];
            }
            else if (_parentOrParents.indexOf(this) === -1) {
                _parentOrParents.push(this);
            }
            else {
                return subscription;
            }
            var subscriptions = this._subscriptions;
            if (subscriptions === null) {
                this._subscriptions = [subscription];
            }
            else {
                subscriptions.push(subscription);
            }
            return subscription;
        };
        Subscription.prototype.remove = function (subscription) {
            var subscriptions = this._subscriptions;
            if (subscriptions) {
                var subscriptionIndex = subscriptions.indexOf(subscription);
                if (subscriptionIndex !== -1) {
                    subscriptions.splice(subscriptionIndex, 1);
                }
            }
        };
        Subscription.EMPTY = (function (empty) {
            empty.closed = true;
            return empty;
        }(new Subscription()));
        return Subscription;
    }());
    function flattenUnsubscriptionErrors(errors) {
        return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError) ? err.errors : err); }, []);
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var rxSubscriber = /*@__PURE__*/ (function () {
        return typeof Symbol === 'function'
            ? /*@__PURE__*/ Symbol('rxSubscriber')
            : '@@rxSubscriber_' + /*@__PURE__*/ Math.random();
    })();

    /** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */
    var Subscriber = /*@__PURE__*/ (function (_super) {
        __extends(Subscriber, _super);
        function Subscriber(destinationOrNext, error, complete) {
            var _this = _super.call(this) || this;
            _this.syncErrorValue = null;
            _this.syncErrorThrown = false;
            _this.syncErrorThrowable = false;
            _this.isStopped = false;
            switch (arguments.length) {
                case 0:
                    _this.destination = empty;
                    break;
                case 1:
                    if (!destinationOrNext) {
                        _this.destination = empty;
                        break;
                    }
                    if (typeof destinationOrNext === 'object') {
                        if (destinationOrNext instanceof Subscriber) {
                            _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                            _this.destination = destinationOrNext;
                            destinationOrNext.add(_this);
                        }
                        else {
                            _this.syncErrorThrowable = true;
                            _this.destination = new SafeSubscriber(_this, destinationOrNext);
                        }
                        break;
                    }
                default:
                    _this.syncErrorThrowable = true;
                    _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                    break;
            }
            return _this;
        }
        Subscriber.prototype[rxSubscriber] = function () { return this; };
        Subscriber.create = function (next, error, complete) {
            var subscriber = new Subscriber(next, error, complete);
            subscriber.syncErrorThrowable = false;
            return subscriber;
        };
        Subscriber.prototype.next = function (value) {
            if (!this.isStopped) {
                this._next(value);
            }
        };
        Subscriber.prototype.error = function (err) {
            if (!this.isStopped) {
                this.isStopped = true;
                this._error(err);
            }
        };
        Subscriber.prototype.complete = function () {
            if (!this.isStopped) {
                this.isStopped = true;
                this._complete();
            }
        };
        Subscriber.prototype.unsubscribe = function () {
            if (this.closed) {
                return;
            }
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
        };
        Subscriber.prototype._next = function (value) {
            this.destination.next(value);
        };
        Subscriber.prototype._error = function (err) {
            this.destination.error(err);
            this.unsubscribe();
        };
        Subscriber.prototype._complete = function () {
            this.destination.complete();
            this.unsubscribe();
        };
        Subscriber.prototype._unsubscribeAndRecycle = function () {
            var _parentOrParents = this._parentOrParents;
            this._parentOrParents = null;
            this.unsubscribe();
            this.closed = false;
            this.isStopped = false;
            this._parentOrParents = _parentOrParents;
            return this;
        };
        return Subscriber;
    }(Subscription));
    var SafeSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(SafeSubscriber, _super);
        function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
            var _this = _super.call(this) || this;
            _this._parentSubscriber = _parentSubscriber;
            var next;
            var context = _this;
            if (isFunction(observerOrNext)) {
                next = observerOrNext;
            }
            else if (observerOrNext) {
                next = observerOrNext.next;
                error = observerOrNext.error;
                complete = observerOrNext.complete;
                if (observerOrNext !== empty) {
                    context = Object.create(observerOrNext);
                    if (isFunction(context.unsubscribe)) {
                        _this.add(context.unsubscribe.bind(context));
                    }
                    context.unsubscribe = _this.unsubscribe.bind(_this);
                }
            }
            _this._context = context;
            _this._next = next;
            _this._error = error;
            _this._complete = complete;
            return _this;
        }
        SafeSubscriber.prototype.next = function (value) {
            if (!this.isStopped && this._next) {
                var _parentSubscriber = this._parentSubscriber;
                if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._next, value);
                }
                else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                    this.unsubscribe();
                }
            }
        };
        SafeSubscriber.prototype.error = function (err) {
            if (!this.isStopped) {
                var _parentSubscriber = this._parentSubscriber;
                var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
                if (this._error) {
                    if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                        this.__tryOrUnsub(this._error, err);
                        this.unsubscribe();
                    }
                    else {
                        this.__tryOrSetError(_parentSubscriber, this._error, err);
                        this.unsubscribe();
                    }
                }
                else if (!_parentSubscriber.syncErrorThrowable) {
                    this.unsubscribe();
                    if (useDeprecatedSynchronousErrorHandling) {
                        throw err;
                    }
                    hostReportError(err);
                }
                else {
                    if (useDeprecatedSynchronousErrorHandling) {
                        _parentSubscriber.syncErrorValue = err;
                        _parentSubscriber.syncErrorThrown = true;
                    }
                    else {
                        hostReportError(err);
                    }
                    this.unsubscribe();
                }
            }
        };
        SafeSubscriber.prototype.complete = function () {
            var _this = this;
            if (!this.isStopped) {
                var _parentSubscriber = this._parentSubscriber;
                if (this._complete) {
                    var wrappedComplete = function () { return _this._complete.call(_this._context); };
                    if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                        this.__tryOrUnsub(wrappedComplete);
                        this.unsubscribe();
                    }
                    else {
                        this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                        this.unsubscribe();
                    }
                }
                else {
                    this.unsubscribe();
                }
            }
        };
        SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
            try {
                fn.call(this._context, value);
            }
            catch (err) {
                this.unsubscribe();
                if (config.useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                else {
                    hostReportError(err);
                }
            }
        };
        SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
            if (!config.useDeprecatedSynchronousErrorHandling) {
                throw new Error('bad call');
            }
            try {
                fn.call(this._context, value);
            }
            catch (err) {
                if (config.useDeprecatedSynchronousErrorHandling) {
                    parent.syncErrorValue = err;
                    parent.syncErrorThrown = true;
                    return true;
                }
                else {
                    hostReportError(err);
                    return true;
                }
            }
            return false;
        };
        SafeSubscriber.prototype._unsubscribe = function () {
            var _parentSubscriber = this._parentSubscriber;
            this._context = null;
            this._parentSubscriber = null;
            _parentSubscriber.unsubscribe();
        };
        return SafeSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */
    function canReportError(observer) {
        while (observer) {
            var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
            if (closed_1 || isStopped) {
                return false;
            }
            else if (destination && destination instanceof Subscriber) {
                observer = destination;
            }
            else {
                observer = null;
            }
        }
        return true;
    }

    /** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
    function toSubscriber(nextOrObserver, error, complete) {
        if (nextOrObserver) {
            if (nextOrObserver instanceof Subscriber) {
                return nextOrObserver;
            }
            if (nextOrObserver[rxSubscriber]) {
                return nextOrObserver[rxSubscriber]();
            }
        }
        if (!nextOrObserver && !error && !complete) {
            return new Subscriber(empty);
        }
        return new Subscriber(nextOrObserver, error, complete);
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var observable = /*@__PURE__*/ (function () { return typeof Symbol === 'function' && Symbol.observable || '@@observable'; })();

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function noop() { }

    /** PURE_IMPORTS_START _noop PURE_IMPORTS_END */
    function pipeFromArray(fns) {
        if (!fns) {
            return noop;
        }
        if (fns.length === 1) {
            return fns[0];
        }
        return function piped(input) {
            return fns.reduce(function (prev, fn) { return fn(prev); }, input);
        };
    }

    /** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */
    var Observable = /*@__PURE__*/ (function () {
        function Observable(subscribe) {
            this._isScalar = false;
            if (subscribe) {
                this._subscribe = subscribe;
            }
        }
        Observable.prototype.lift = function (operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
        };
        Observable.prototype.subscribe = function (observerOrNext, error, complete) {
            var operator = this.operator;
            var sink = toSubscriber(observerOrNext, error, complete);
            if (operator) {
                sink.add(operator.call(sink, this.source));
            }
            else {
                sink.add(this.source || (config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                    this._subscribe(sink) :
                    this._trySubscribe(sink));
            }
            if (config.useDeprecatedSynchronousErrorHandling) {
                if (sink.syncErrorThrowable) {
                    sink.syncErrorThrowable = false;
                    if (sink.syncErrorThrown) {
                        throw sink.syncErrorValue;
                    }
                }
            }
            return sink;
        };
        Observable.prototype._trySubscribe = function (sink) {
            try {
                return this._subscribe(sink);
            }
            catch (err) {
                if (config.useDeprecatedSynchronousErrorHandling) {
                    sink.syncErrorThrown = true;
                    sink.syncErrorValue = err;
                }
                if (canReportError(sink)) {
                    sink.error(err);
                }
                else {
                    console.warn(err);
                }
            }
        };
        Observable.prototype.forEach = function (next, promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var subscription;
                subscription = _this.subscribe(function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        if (subscription) {
                            subscription.unsubscribe();
                        }
                    }
                }, reject, resolve);
            });
        };
        Observable.prototype._subscribe = function (subscriber) {
            var source = this.source;
            return source && source.subscribe(subscriber);
        };
        Observable.prototype[observable] = function () {
            return this;
        };
        Observable.prototype.pipe = function () {
            var arguments$1 = arguments;

            var operations = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                operations[_i] = arguments$1[_i];
            }
            if (operations.length === 0) {
                return this;
            }
            return pipeFromArray(operations)(this);
        };
        Observable.prototype.toPromise = function (promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var value;
                _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
            });
        };
        Observable.create = function (subscribe) {
            return new Observable(subscribe);
        };
        return Observable;
    }());
    function getPromiseCtor(promiseCtor) {
        if (!promiseCtor) {
            promiseCtor =  Promise;
        }
        if (!promiseCtor) {
            throw new Error('no Promise impl found');
        }
        return promiseCtor;
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var ObjectUnsubscribedErrorImpl = /*@__PURE__*/ (function () {
        function ObjectUnsubscribedErrorImpl() {
            Error.call(this);
            this.message = 'object unsubscribed';
            this.name = 'ObjectUnsubscribedError';
            return this;
        }
        ObjectUnsubscribedErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
        return ObjectUnsubscribedErrorImpl;
    })();
    var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

    /** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
    var SubjectSubscription = /*@__PURE__*/ (function (_super) {
        __extends(SubjectSubscription, _super);
        function SubjectSubscription(subject, subscriber) {
            var _this = _super.call(this) || this;
            _this.subject = subject;
            _this.subscriber = subscriber;
            _this.closed = false;
            return _this;
        }
        SubjectSubscription.prototype.unsubscribe = function () {
            if (this.closed) {
                return;
            }
            this.closed = true;
            var subject = this.subject;
            var observers = subject.observers;
            this.subject = null;
            if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
                return;
            }
            var subscriberIndex = observers.indexOf(this.subscriber);
            if (subscriberIndex !== -1) {
                observers.splice(subscriberIndex, 1);
            }
        };
        return SubjectSubscription;
    }(Subscription));

    /** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */
    var SubjectSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(SubjectSubscriber, _super);
        function SubjectSubscriber(destination) {
            var _this = _super.call(this, destination) || this;
            _this.destination = destination;
            return _this;
        }
        return SubjectSubscriber;
    }(Subscriber));
    var Subject = /*@__PURE__*/ (function (_super) {
        __extends(Subject, _super);
        function Subject() {
            var _this = _super.call(this) || this;
            _this.observers = [];
            _this.closed = false;
            _this.isStopped = false;
            _this.hasError = false;
            _this.thrownError = null;
            return _this;
        }
        Subject.prototype[rxSubscriber] = function () {
            return new SubjectSubscriber(this);
        };
        Subject.prototype.lift = function (operator) {
            var subject = new AnonymousSubject(this, this);
            subject.operator = operator;
            return subject;
        };
        Subject.prototype.next = function (value) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            if (!this.isStopped) {
                var observers = this.observers;
                var len = observers.length;
                var copy = observers.slice();
                for (var i = 0; i < len; i++) {
                    copy[i].next(value);
                }
            }
        };
        Subject.prototype.error = function (err) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            this.hasError = true;
            this.thrownError = err;
            this.isStopped = true;
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].error(err);
            }
            this.observers.length = 0;
        };
        Subject.prototype.complete = function () {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            this.isStopped = true;
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].complete();
            }
            this.observers.length = 0;
        };
        Subject.prototype.unsubscribe = function () {
            this.isStopped = true;
            this.closed = true;
            this.observers = null;
        };
        Subject.prototype._trySubscribe = function (subscriber) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            else {
                return _super.prototype._trySubscribe.call(this, subscriber);
            }
        };
        Subject.prototype._subscribe = function (subscriber) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            else if (this.hasError) {
                subscriber.error(this.thrownError);
                return Subscription.EMPTY;
            }
            else if (this.isStopped) {
                subscriber.complete();
                return Subscription.EMPTY;
            }
            else {
                this.observers.push(subscriber);
                return new SubjectSubscription(this, subscriber);
            }
        };
        Subject.prototype.asObservable = function () {
            var observable = new Observable();
            observable.source = this;
            return observable;
        };
        Subject.create = function (destination, source) {
            return new AnonymousSubject(destination, source);
        };
        return Subject;
    }(Observable));
    var AnonymousSubject = /*@__PURE__*/ (function (_super) {
        __extends(AnonymousSubject, _super);
        function AnonymousSubject(destination, source) {
            var _this = _super.call(this) || this;
            _this.destination = destination;
            _this.source = source;
            return _this;
        }
        AnonymousSubject.prototype.next = function (value) {
            var destination = this.destination;
            if (destination && destination.next) {
                destination.next(value);
            }
        };
        AnonymousSubject.prototype.error = function (err) {
            var destination = this.destination;
            if (destination && destination.error) {
                this.destination.error(err);
            }
        };
        AnonymousSubject.prototype.complete = function () {
            var destination = this.destination;
            if (destination && destination.complete) {
                this.destination.complete();
            }
        };
        AnonymousSubject.prototype._subscribe = function (subscriber) {
            var source = this.source;
            if (source) {
                return this.source.subscribe(subscriber);
            }
            else {
                return Subscription.EMPTY;
            }
        };
        return AnonymousSubject;
    }(Subject));

    /** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */
    var BehaviorSubject = /*@__PURE__*/ (function (_super) {
        __extends(BehaviorSubject, _super);
        function BehaviorSubject(_value) {
            var _this = _super.call(this) || this;
            _this._value = _value;
            return _this;
        }
        Object.defineProperty(BehaviorSubject.prototype, "value", {
            get: function () {
                return this.getValue();
            },
            enumerable: true,
            configurable: true
        });
        BehaviorSubject.prototype._subscribe = function (subscriber) {
            var subscription = _super.prototype._subscribe.call(this, subscriber);
            if (subscription && !subscription.closed) {
                subscriber.next(this._value);
            }
            return subscription;
        };
        BehaviorSubject.prototype.getValue = function () {
            if (this.hasError) {
                throw this.thrownError;
            }
            else if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            else {
                return this._value;
            }
        };
        BehaviorSubject.prototype.next = function (value) {
            _super.prototype.next.call(this, this._value = value);
        };
        return BehaviorSubject;
    }(Subject));

    var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
        var arguments$1 = arguments;

        for (var s = 0, i = 0, il = arguments.length; i < il; i++) { s += arguments$1[i].length; }
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            { for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                { r[k] = a[j]; } }
        return r;
    };
    function observe(instance, callbacks) {
        var fallbacks = callbacks || {};
        var functions = new Map();
        var subjects = new Map();
        var proxy = new Proxy(instance, {
            get: function (target, name) {
                var fallbackValue = fallbacks[name];
                var targetValue = target[name];
                var value = fallbackValue && !targetValue ? fallbackValue : targetValue;
                if (typeof value === "function") {
                    var functionValue_1 = value;
                    var functionWrapper = functions.get(functionValue_1);
                    if (!functionWrapper) {
                        functionWrapper = function () {
                            var arguments$1 = arguments;

                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments$1[_i];
                            }
                            var result = functionValue_1.apply(this, args);
                            var subject = subjects.get(name);
                            if (subject) {
                                subject.next(args);
                            }
                            return result;
                        };
                        functions.set(functionValue_1, functionWrapper);
                    }
                    value = functionWrapper;
                }
                return value;
            },
            getOwnPropertyDescriptor: function (target, name) {
                return (Object.getOwnPropertyDescriptor(target, name) ||
                    Object.getOwnPropertyDescriptor(fallbacks, name));
            },
            has: function (target, name) {
                return name in target || name in fallbacks;
            },
            ownKeys: function (target) {
                return __spreadArrays(Reflect.ownKeys(target), Reflect.ownKeys(fallbacks));
            },
            set: function (target, name, value) {
                target[name] = value;
                var subject = subjects.get(name);
                if (subject) {
                    subject.next(value);
                }
                return true;
            }
        });
        return {
            observables: new Proxy({}, {
                get: function (target, name) {
                    var subject = subjects.get(name);
                    if (!subject) {
                        subject =
                            typeof instance[name] === "function" ||
                                typeof fallbacks[name] === "function"
                                ? new Subject()
                                : new BehaviorSubject(instance[name]);
                        subjects.set(name, subject);
                    }
                    return subject.asObservable();
                }
            }),
            proxy: proxy
        };
    }

    // 
    var BaseSpaComponent = /** @class */ (function () {
        function BaseSpaComponent(callee) {
            var _this = this;
            if (callee === void 0) { callee = null; }
            this.data = null;
            this._template = '';
            this.node = null;
            this.events = {};
            this._cssFile = '';
            this._parentId = '';
            this._handlers = {};
            this._parentNode = null;
            this.guid = function () {
                var S4 = function () {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                };
                return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
            };
            this._name = '';
            this._mobxModel = null;
            // mobxModel ( state: IMobxModel ) {
            //     this._mobxModel = state;
            //     return this;
            // }
            this.components = [];
            this.mobxSubsribers = [];
            this.stopTrigger = false;
            this.whatchedProperties = null;
            this.propValues = {};
            this.templateToHtmlText = function (template, data) {
                // const props = template.match( /(\{)(.*?)(\})/gi );
                debugger;
                var props = _this.parseTemplate(template);
                if (!props) {
                    return template;
                }
                var wasEmpty = false;
                if (!_this.whatchedProperties) {
                    _this.whatchedProperties = [];
                    wasEmpty = true;
                }
                var pName = '';
                _this.propValues = {};
                var propValue = '';
                debugger;
                Object.keys(props).forEach(function (p) {
                    pName = p.replace('{', '').replace('}', '');
                    propValue = data[pName];
                    _this.propValues[p] = propValue;
                    template = template.replace(p, propValue);
                    _this.whatchedProperties.push(pName);
                });
                var mobxModel = _this._mobxModel;
                if (wasEmpty && mobxModel) {
                    var prop = '';
                    for (var i = 0; i < _this.whatchedProperties.length; i++) {
                        prop = _this.whatchedProperties[i];
                        var obsProp = mobxModel.observables[prop];
                        if (obsProp) {
                            obsProp.subscribe(function (value) {
                                // this.object[prop] = value;
                                if (!_this.rendered) {
                                    return;
                                }
                                console.log(value);
                                _this.refresh();
                            });
                        }
                    }
                }
                return template;
            };
            this.addChild = function (node, template, data) {
                _this.data = data;
                var htmlText = _this.templateToHtmlText(template, data);
                node.insertAdjacentHTML('beforeend', htmlText);
                var lastChild = node.lastChild;
                if (!lastChild) {
                    return null;
                }
                return lastChild.previousSibling;
            };
            this.insertElement = function (parentId, template, data) {
                _this.data = data;
                var htmlText = _this.templateToHtmlText(template, data);
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
            this.assignChildNodeEv = function (childNode, evName, evInfoArray) {
                var evInfo = null;
                var _loop_1 = function (i) {
                    evInfo = evInfoArray[i];
                    var htmlElement = childNode;
                    var func = evInfo.func, id = evInfo.id;
                    var exec = function (el, func) {
                        var newValue = _this.getEventValue(el);
                        func(newValue);
                    };
                    if (id) {
                        var idValue = _this.spaRenderer.textToHtmlText(id, _this.getModel());
                        var idNOde = _this.findElementById(htmlElement, idValue);
                        if (idNOde) {
                            htmlElement = idNOde;
                        }
                    }
                    htmlElement.addEventListener(evName, function (element) {
                        exec(element, func);
                    });
                    htmlElement[evName] = function (el) {
                        exec(el, func);
                    };
                };
                for (var i = 0; i < evInfoArray.length; i++) {
                    _loop_1(i);
                }
                return _this;
            };
            this.rendered = false;
            this._containerTemplate = '';
            this._calee = callee;
            this.spaRenderer = new SpaRender();
        }
        BaseSpaComponent.prototype.name = function (val) {
            this._name = val;
            return this;
        };
        BaseSpaComponent.prototype.parentId = function (parentIdValue) {
            this._parentId = parentIdValue;
            return this;
        };
        BaseSpaComponent.prototype.parentNode = function (node) {
            this._parentNode = node;
            return this;
        };
        BaseSpaComponent.prototype.cssFile = function (cssFilePath) {
            this._cssFile = cssFilePath;
            return this;
        };
        BaseSpaComponent.prototype.event = function (eventName, func, id) {
            if (id === void 0) { id = ''; }
            var _a;
            var ev = this.events[eventName];
            if (!ev) {
                this.events[eventName] = [];
                ev = this.events[eventName];
            }
            (_a = ev) === null || _a === void 0 ? void 0 : _a.push({ func: func, id: id });
            return this;
        };
        BaseSpaComponent.prototype.handlers = function (val) {
            if (val === void 0) { val = {}; }
            this._handlers = val;
            return this;
        };
        BaseSpaComponent.prototype.model = function (state) {
            this._mobxModel = this.asObservable(state);
            this._model = state;
            if (this._calee) {
                this._calee.data = this._mobxModel.object;
            }
            else {
                debugger;
            }
            return this;
        };
        Object.defineProperty(BaseSpaComponent.prototype, "modelValue", {
            get: function () {
                return this.getModel();
            },
            enumerable: true,
            configurable: true
        });
        BaseSpaComponent.prototype.addComponent = function (fn, thisArg) {
            var inst = new SpaComponent();
            fn(inst);
            this.components.push(inst);
            return this;
        };
        BaseSpaComponent.prototype.asObservable = function (obj) {
            var _a = observe(obj), observables = _a.observables, proxy = _a.proxy;
            return {
                object: proxy,
                observables: observables,
            };
        };
        BaseSpaComponent.prototype.subscribe = function (property, valueChangedEvent) {
            var v = {
                property: property,
                valueChangedEvent: valueChangedEvent,
            };
            this.mobxSubsribers.push(v);
            return this;
        };
        BaseSpaComponent.prototype.applySubscribers = function () {
            if (this.stopTrigger) {
                return;
            }
            var _a = this, mobxSubsribers = _a.mobxSubsribers, _mobxModel = _a._mobxModel;
            if (!_mobxModel) {
                return;
            }
            mobxSubsribers.forEach(function (el) {
                var property = el.property, valueChangedEvent = el.valueChangedEvent;
                var obsProp = _mobxModel.observables[property];
                if (obsProp) {
                    obsProp.subscribe(function (value) {
                        // this.object[prop] = value;
                        console.log(value);
                        valueChangedEvent(value);
                    });
                }
            }
            // _mobx.subscribe( el.property, el.valueChangedEvent ) 
            );
            // 
        };
        BaseSpaComponent.prototype.template = function (template) {
            this._template = template;
            return this;
        };
        BaseSpaComponent.prototype.setValue = function (val) {
            if (!this.node) {
                return;
            }
            this.node['value'] = val;
        };
        BaseSpaComponent.prototype.getValue = function (node) {
            if (node === void 0) { node = this.node; }
            if (!node) {
                return null;
            }
            return node['value'];
        };
        BaseSpaComponent.prototype.asInt = function () {
            var v = this.getValue();
            return v ? parseInt(v) : 0;
        };
        BaseSpaComponent.prototype.setState = function (propName, value) {
            var m = this._mobxModel;
            if (!m) {
                return;
            }
            this.stopTrigger = true;
            m.object[propName] = value;
            this.stopTrigger = false;
        };
        BaseSpaComponent.prototype.insertCssFile = function () {
            if (!this._cssFile) {
                return;
            }
            var head = document.getElementsByTagName('head')[0];
            var style = document.createElement('link');
            style.href = this._cssFile;
            style.type = 'text/css';
            style.rel = 'stylesheet';
            head.append(style);
        };
        BaseSpaComponent.prototype.parseTemplate = function (template) {
            var result = {};
            var props = template.match(/(\w+=\".*?\")/gi);
            if (!props) {
                return null;
            }
            var pValue = [];
            var bindValue = '';
            props.forEach(function (prop) {
                pValue = prop.trim().split('=');
                bindValue = pValue[1];
                if (bindValue.indexOf('{') > -1) {
                    bindValue = bindValue.replace(/"/g, '');
                    result[bindValue] = pValue[0];
                }
            });
            return result;
        };
        BaseSpaComponent.prototype.assignEvents = function (node) {
            var _this = this;
            var events = this.events;
            var eventInfo = null;
            Object.keys(events).forEach(function (key) {
                eventInfo = events[key];
                if (eventInfo) {
                    _this.assignChildNodeEv(node, key, eventInfo);
                }
                //spaRenderer.assignChildNodeEv( node, ev, func );
            });
        };
        BaseSpaComponent.prototype.findElementById = function (parent, id) {
            if (!parent) {
                return null;
            }
            if (parent.id === id) {
                return parent;
            }
            var childNodes = parent.childNodes;
            if (!childNodes) {
                return null;
            }
            var i = 0;
            var result = null;
            while (i < childNodes.length && !result) {
                if (childNodes[i].id === id) {
                    result = childNodes[i];
                }
                i++;
            }
            i = 0;
            if (!result) {
                while (i < childNodes.length && !result) {
                    result = this.findElementById(childNodes[i], id);
                    i++;
                }
            }
            return result;
        };
        BaseSpaComponent.prototype.getModel = function () {
            return (this._mobxModel && this._mobxModel.object) || this._model;
        };
        BaseSpaComponent.prototype.refresh = function () {
            var _a = this, node = _a.node, components = _a.components;
            var model = this.getModel();
            var h = this.templateToHtmlText(this._template, model);
            // const h = this.spaRenderer.getHtml( this._template, model );
            this.updateNodeValue(node, h);
            // node.innerHTML = h;
            this.assignEvents(node);
            // this.insertCssFile();
            if (components && components.length) {
                components.forEach(function (comp) {
                    // comp.parentNode( parentNode );
                    comp.render1();
                });
            }
        };
        BaseSpaComponent.prototype.renderLogic = function () {
            var components = this.components;
            var node = null;
            var model = this.getModel();
            if (this._parentNode) {
                node = this.addChild(this._parentNode, this._template, model);
            }
            else {
                node = this.insertElement('a', this._template, model);
            }
            if (!node) {
                return null;
            }
            this.node = node;
            this.insertCssFile();
            this.assignEvents(node);
            return node;
        };
        BaseSpaComponent.prototype.render1 = function () {
            var components = this.components;
            var node = this.renderLogic();
            this.applySubscribers();
            if (components && components.length) {
                var parentNode_1 = this.spaRenderer.addHmlChild(node, "\n\t\t\t<div>\n\t\t\t</div>\n            ");
                components.forEach(function (comp) {
                    comp.parentNode(parentNode_1);
                    comp.render1();
                });
            }
            this.rendered = true;
            return node;
        };
        BaseSpaComponent.prototype.containerTemplate = function (template) {
            this._containerTemplate = template;
            return this;
        };
        BaseSpaComponent.prototype.getEventValue = function (ev) {
            var target = ev.target;
            if (!target) {
                return null;
            }
            switch (target.type) {
                case 'checkbox': {
                    return target.checked;
                }
                default: {
                    return target.value;
                }
            }
        };
        BaseSpaComponent.prototype.getEventValueAsNumber = function (ev) {
            return ev.target ? ev.target.value : null;
        };
        BaseSpaComponent.prototype.getEventValueAsDate = function (ev) {
            return ev.target ? ev.target.valueAsDate : null;
        };
        return BaseSpaComponent;
    }());

    var SpaComponent = /** @class */ (function (_super) {
        __extends(SpaComponent, _super);
        function SpaComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SpaComponent.prototype.updateInterface = function () {
        };
        SpaComponent.prototype.updateNodeValue = function (node, val) {
            if (!node) {
                return;
            }
            node.innerHTML = val;
        };
        SpaComponent.prototype.render = function () {
            return this.render1();
            // const {events, spaRenderer} = this;
            // const node =  spaRenderer.insertElement('a',this._template, this._model);
            // if(!node) {
            //     return;
            // }
            // this.node = node;
            // let func = null;
            // Object.keys(events).forEach(ev => {
            //     func = events[ev as IComponentEvent] as Function;
            //     spaRenderer.assignChildNodeEv(node, ev, func);
            // });
        };
        return SpaComponent;
    }(BaseSpaComponent));

    var SpaRepeaterComponent = /** @class */ (function (_super) {
        __extends(SpaRepeaterComponent, _super);
        function SpaRepeaterComponent(testType) {
            var _this = _super.call(this) || this;
            _this.testType = testType;
            // render (): void {
            //     throw new Error( "Method not implemented." );
            // }
            _this.nodes = {};
            _this._parentTemplate = '';
            return _this;
        }
        SpaRepeaterComponent.prototype.getNew = function () {
            return new this.testType();
        };
        // private _parentNode: Node | null = null;
        SpaRepeaterComponent.prototype.setModel = function (list) {
            var _this = this;
            if (!list) {
                return;
            }
            this._parentNode = this.spaRenderer.insertHtml('a', "\n\t\t\t<div class=\"todoContainer\">\n\t\t\t</div>\n\t\t\t");
            var comp = null;
            list.forEach(function (el) {
                var containerItemNode = _this.spaRenderer.addHmlChild(_this._parentNode, "\n\t\t\t<div class=\"todorow\" id=\"todolist\">\n\t\t\t</div>\n            ");
                comp = _this.getNew();
                var node = comp.handlers(_this._handlers).cssFile(_this._cssFile)
                    .parentNode(containerItemNode)
                    .model(el)
                    .triggerRender();
                _this.nodes[el.id] = node;
            });
            return this;
        };
        SpaRepeaterComponent.prototype.parentTemplate = function (template) {
            this._parentTemplate = template;
            return this;
        };
        SpaRepeaterComponent.prototype.remove = function (key) {
            var node = this.nodes[key];
            if (!node) {
                return;
            }
            if (!this._parentNode) {
                return;
            }
            this._parentNode.removeChild(node);
        };
        return SpaRepeaterComponent;
    }(SpaComponent));

    var IComponentEvent;
    (function (IComponentEvent) {
        IComponentEvent["oncopy"] = "oncopy";
        IComponentEvent["oncut"] = "oncut";
        IComponentEvent["onpaste"] = "onpaste";
        IComponentEvent["onabort"] = "onabort";
        IComponentEvent["onblur"] = "onblur";
        IComponentEvent["oncancel"] = "oncancel";
        IComponentEvent["oncanplay"] = "oncanplay";
        IComponentEvent["onchange"] = "onchange";
        IComponentEvent["onclick"] = "onclick";
        IComponentEvent["onclose"] = "onclose";
        IComponentEvent["ondblclick"] = "ondblclick";
        IComponentEvent["ondrag"] = "ondrag";
        IComponentEvent["ondragend"] = "ondragend";
        IComponentEvent["ondragenter"] = "ondragenter";
        IComponentEvent["ondragleave"] = "ondragleave";
        IComponentEvent["ondragover"] = "ondragover";
        IComponentEvent["ondragstart"] = "ondragstart";
        IComponentEvent["ondrop"] = "ondrop";
        IComponentEvent["onfocus"] = "onfocus";
        IComponentEvent["onformdata"] = "onformdata";
        IComponentEvent["oninput"] = "oninput";
        IComponentEvent["onkeydown"] = "onkeydown";
        IComponentEvent["onkeypress"] = "onkeypress";
        IComponentEvent["onkeyup"] = "onkeyup";
        IComponentEvent["onmousedown"] = "onmousedown";
        IComponentEvent["onmouseenter"] = "onmouseenter";
        IComponentEvent["onmouseleave"] = "onmouseleave";
        IComponentEvent["onmousemove"] = "onmousemove";
        IComponentEvent["onmouseout"] = "onmouseout";
        IComponentEvent["onmouseover"] = "onmouseover";
        IComponentEvent["onmouseup"] = "onmouseup";
        IComponentEvent["onmousewheel"] = "onmousewheel";
    })(IComponentEvent || (IComponentEvent = {}));

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

    var BaseSpaComposedComponent = /** @class */ (function (_super) {
        __extends(BaseSpaComposedComponent, _super);
        function BaseSpaComposedComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseSpaComposedComponent.prototype.model = function (state) {
            this._model = state;
            return this;
        };
        return BaseSpaComposedComponent;
    }(BaseSpaComponent));

    var ToDoItem = /** @class */ (function (_super) {
        __extends(ToDoItem, _super);
        function ToDoItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._html = '';
            return _this;
        }
        ToDoItem.prototype.updateInterface = function () {
            // throw new Error( "Method not implemented." );
        };
        ToDoItem.prototype.updateNodeValue = function (node, val) {
            // throw new Error( "Method not implemented." );
        };
        ToDoItem.prototype.render = function () {
            // const node = this.spaRenderer.insertHtml('a', this._html);
        };
        ToDoItem.prototype.triggerRender = function () {
            var _this = this;
            var y = SpaLib$1.component();
            var h1Node = y.template("\n\t\t\t\n\t\t\t\t<div class=\"todo\">\n\t\t\t\t\t<input id=\"{id}\" type=\"text\" value=\"{name}\">\n\t\t\t\t</div>\n\t\t\t")
                .cssFile(this._cssFile)
                .parentNode(this._parentNode)
                .model(this._model)
                .render();
            var x = SpaLib$1.component();
            var h2Node = x.template("\n\t\t\t\t<button>{id}</button>\n\t\t\t\t</div>\n\t\t\t")
                .handlers(this._handlers)
                .parentNode(this._parentNode)
                .event(IComponentEvent.onclick, function (ev) {
                var v1 = y.asInt();
                console.log(v1);
                _this._handlers['ondelete'](_this._model);
            })
                .model(this._model)
                .render();
            this._parentNode.appendChild(h1Node);
            this._parentNode.appendChild(h2Node);
            return this._parentNode;
        };
        return ToDoItem;
    }(BaseSpaComposedComponent));

    var SpaTextBox = /** @class */ (function (_super) {
        __extends(SpaTextBox, _super);
        function SpaTextBox() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._id = '';
            _this.propName = '';
            return _this;
        }
        SpaTextBox.prototype.id = function (idVal) {
            this._id = idVal;
            return this;
        };
        SpaTextBox.prototype.updateInterface = function () {
        };
        SpaTextBox.prototype.updateNodeValue = function (node, val) {
            if (!node) {
                return;
            }
            debugger;
            var a = this.propValues;
            node.outerHTML = val;
        };
        SpaTextBox.prototype.prop = function (prop) {
            this.propName = prop;
            return this;
        };
        SpaTextBox.prototype.render = function () {
            var _this = this;
            this.event(IComponentEvent.onchange, function () {
                _this.data[_this.propName] = _this.getValue();
            });
            // const mService = new MobxService();
            // const mobxModel: IMobxModel = mService.asObservable( this.mydata );
            _super.prototype.render1.call(this);
        };
        return SpaTextBox;
    }(BaseSpaComponent));

    var ListComponent = /** @class */ (function (_super) {
        __extends(ListComponent, _super);
        function ListComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.data = {
                id: 'xxx',
                id1: 'yyy',
                btnFunc: function (v1, v2) {
                    console.log(v1, v2);
                    return v1 + v2;
                },
                v1: '',
                v2: '',
                v3: '',
                mover: function (val, v2) {
                    console.log(val);
                },
                list: [{ id: '1a', name: 'john' }, { id: '2a', name: 'ionela' }],
                text: "hello dinamic button",
                v3class: ''
            };
            return _this;
        }
        ListComponent.prototype.render = function () {
            var _this = this;
            var y = new SpaTextBox(this)
                .id('t1')
                .prop('v1')
                .template("\n\t\t\t<input type=\"text\" value=\"{v1}\">\n\t\t\t")
                .model(this.data)
                // .event( IComponentEvent.onmouseover, this.data.mover )
                .render();
            var z = new SpaTextBox(this)
                .id('t2')
                .prop('v2')
                .template("\n\t\t\t<input type=\"text\" value=\"{v2}\">\n\t\t\t")
                .model(this.data)
                .render();
            var x = new SpaComponent(this);
            x.template("\n\t\t\t\t<button>{id1}</button>\n\t\t\t")
                .model(this.data)
                .event(IComponentEvent.onclick, function (ev) {
                // var v1 = this.getValue(y);
                // var v2 = this.getValue(z);
                // var v3 = v1 + v2;
                // console.log( v3 );
                // total.setState( 'v3', v3 );
                // total.setValue(v3);
                _this.data.v3 = _this.data.v1 + _this.data.v2;
                _this.data.v3class = _this.guid();
            })
                .render();
            var total = new SpaTextBox(this);
            total.template("\n\t\t\t<input type=\"text\" value=\"{v3}\" class=\"{v3class}\">\n\t\t\t")
                .model(this.data)
                // .event( IComponentEvent.onmouseover, this.data.mover )
                .render();
            var repeater = new SpaRepeaterComponent(ToDoItem);
            repeater
                .name('repeater')
                .cssFile('../app/components/ToDoItem.css')
                .handlers({
                ondelete: function (v) {
                    var newModel = _this.data.list.filter(function (el) { return el.id !== v.id; });
                    _this.data.list = newModel;
                    repeater.remove(v.id);
                }
            })
                .setModel(this.data.list)
                .render();
        };
        return ListComponent;
    }(SpaComponent));

    var HomeComponent = /** @class */ (function (_super) {
        __extends(HomeComponent, _super);
        function HomeComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.data = {
                id: 'inputId',
                id1: 'yyy',
                btnFunc: function (v1, v2) {
                    console.log(v1, v2);
                    return v1 + v2;
                },
                v3: 0,
                mover: function (val, v2) {
                    console.log(val);
                },
                list: [{ id: '1a', name: 'john' }, { id: '2a', name: 'ionela' }],
                text: "hello dinamic button",
                name: 'test binding',
                shownewtodoform: false,
                showInput: true,
                inputclass: 'default',
            };
            return _this;
        }
        HomeComponent.prototype.render = function () {
            // const mService = new MobxService();
            // const mobxModel: IMobxModel = mService.asObservable( this.mydata );
            var _this = this;
            var binding = new SpaComponent(this);
            binding
                .name('mobx test')
                .model(this.data)
                .template("\n\t\t\t\t<div>\n\t\t\t\t\t<div class=\"todo1\">\n\t\t\t\t\t\t<input id=\"{id}\" class=\"{inputclass}\" type=\"text\" value=\"{name}\">\n\t\t\t\t\t\t<button id=\"btnShowHide\">show hide</button>\n\t\t\t\t\t\t<label for=\"vehicle1\"> Show Hide text box</label><br>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<label>{name}</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<button id=\"showmodel\">show model</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t")
                .cssFile('../app/components/HomeComponent.css')
                .event(IComponentEvent.onchange, function (newValue) {
                _this.data.name = newValue;
            }, '{id}')
                .event(IComponentEvent.onclick, function (newValue) {
                var data = _this.data;
                data.showInput = !data.showInput;
                var showInput = data.showInput;
                if (showInput) {
                    data.inputclass = 'default';
                }
                else {
                    data.inputclass = 'hidden';
                }
            }, 'btnShowHide')
                .event(IComponentEvent.onclick, function (newValue) {
                var data = _this.data;
                console.log(data);
            }, 'showmodel')
                .subscribe('name', function (newValue) {
                console.log(' name changed ', name);
            })
                .containerTemplate("\n\t\t\t\t\t<div class=\"parent\">\n\t\t\t\t\t</div>\n            ")
                // .mobxModel( mobxModel )
                // .addComponent( ( comp ) => {
                // 	comp.name( 'new 1' )
                // 		.mobxModel( mobxModel )
                // 		.subscribe( 'name', ( newValue ) => {
                // 			comp.componentReceiveProps( { name: newValue } );
                // 		} )
                // 		.template( `
                // 		<label>{name}</label>
                // 	`)
                // } )
                .render();
        };
        return HomeComponent;
    }(BaseSpaComponent));

    var HomeModule = /** @class */ (function () {
        function HomeModule() {
            var homeComponent = new HomeComponent();
            SpaLib$1.addComponent('home', homeComponent);
            var listComp = new ListComponent();
            SpaLib$1.addComponent('list', listComp);
            // const repeater
        }
        return HomeModule;
    }());
    var HomeModule$1 = new HomeModule();

    return HomeModule$1;

}());
