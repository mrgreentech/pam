/*! styledown-skins - v0.1.0 - 2015-03-05 */
/*!
 * jQuery UI Core 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
(function( $, undefined ) {

var uuid = 0,
	runiqueId = /^ui-id-\d+$/;

// $.ui might exist from components with no dependencies, e.g., $.ui.position
$.ui = $.ui || {};

$.extend( $.ui, {
	version: "1.10.4",

	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
});

// plugins
$.fn.extend({
	focus: (function( orig ) {
		return function( delay, fn ) {
			return typeof delay === "number" ?
				this.each(function() {
					var elem = this;
					setTimeout(function() {
						$( elem ).focus();
						if ( fn ) {
							fn.call( elem );
						}
					}, delay );
				}) :
				orig.apply( this, arguments );
		};
	})( $.fn.focus ),

	scrollParent: function() {
		var scrollParent;
		if (($.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.css(this,"position")) && (/(auto|scroll)/).test($.css(this,"overflow")+$.css(this,"overflow-y")+$.css(this,"overflow-x"));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.css(this,"overflow")+$.css(this,"overflow-y")+$.css(this,"overflow-x"));
			}).eq(0);
		}

		return (/fixed/).test(this.css("position")) || !scrollParent.length ? $(document) : scrollParent;
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	},

	uniqueId: function() {
		return this.each(function() {
			if ( !this.id ) {
				this.id = "ui-id-" + (++uuid);
			}
		});
	},

	removeUniqueId: function() {
		return this.each(function() {
			if ( runiqueId.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	}
});

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap=#" + mapName + "]" )[0];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return $.expr.filters.visible( element ) &&
		!$( element ).parents().addBack().filter(function() {
			return $.css( this, "visibility" ) === "hidden";
		}).length;
}

$.extend( $.expr[ ":" ], {
	data: $.expr.createPseudo ?
		$.expr.createPseudo(function( dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		}) :
		// support: jQuery <1.8
		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// support: jQuery <1.8
if ( !$.fn.addBack ) {
	$.fn.addBack = function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	};
}

// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
	$.fn.removeData = (function( removeData ) {
		return function( key ) {
			if ( arguments.length ) {
				return removeData.call( this, $.camelCase( key ) );
			} else {
				return removeData.call( this );
			}
		};
	})( $.fn.removeData );
}





// deprecated
$.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );

$.support.selectstart = "onselectstart" in document.createElement( "div" );
$.fn.extend({
	disableSelection: function() {
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
			".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
	},

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	}
});

$.extend( $.ui, {
	// $.ui.plugin is deprecated. Use $.widget() extensions instead.
	plugin: {
		add: function( module, option, set ) {
			var i,
				proto = $.ui[ module ].prototype;
			for ( i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args ) {
			var i,
				set = instance.plugins[ name ];
			if ( !set || !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) {
				return;
			}

			for ( i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	},

	// only used by resizable
	hasScroll: function( el, a ) {

		//If overflow is hidden, the element might have extra content, but the user wants to hide it
		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}

		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;

		if ( el[ scroll ] > 0 ) {
			return true;
		}

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	}
});

})( jQuery );

/*!
 * jQuery UI Widget 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
(function( $, undefined ) {

var uuid = 0,
	slice = Array.prototype.slice,
	_cleanData = $.cleanData;
$.cleanData = function( elems ) {
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
		try {
			$( elem ).triggerHandler( "remove" );
		// http://bugs.jquery.com/ticket/8235
		} catch( e ) {}
	}
	_cleanData( elems );
};

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );
};

$.widget.extend = function( target ) {
	var input = slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData( this.widgetName )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			// accept selectors, DOM elements
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^(\w+)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

})( jQuery );

/* jquery Tocify - v1.9.0 - 2013-10-01
* http://www.gregfranko.com/jquery.tocify.js/
* Copyright (c) 2013 Greg Franko; Licensed MIT */

// Immediately-Invoked Function Expression (IIFE) [Ben Alman Blog Post](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) that calls another IIFE that contains all of the plugin logic.  I used this pattern so that anyone viewing this code would not have to scroll to the bottom of the page to view the local parameters that were passed to the main IIFE.
(function(tocify) {

    // ECMAScript 5 Strict Mode: [John Resig Blog Post](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
    "use strict";

    // Calls the second IIFE and locally passes in the global jQuery, window, and document objects
    tocify(window.jQuery, window, document);

}

// Locally passes in `jQuery`, the `window` object, the `document` object, and an `undefined` variable.  The `jQuery`, `window` and `document` objects are passed in locally, to improve performance, since javascript first searches for a variable match within the local variables set before searching the global variables set.  All of the global variables are also passed in locally to be minifier friendly. `undefined` can be passed in locally, because it is not a reserved word in JavaScript.
(function($, window, document, undefined) {

    // ECMAScript 5 Strict Mode: [John Resig Blog Post](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
    "use strict";

    var tocClassName = "tocify",
        tocClass = "." + tocClassName,
        tocFocusClassName = "tocify-focus",
        tocHoverClassName = "tocify-hover",
        hideTocClassName = "tocify-hide",
        hideTocClass = "." + hideTocClassName,
        headerClassName = "tocify-header",
        headerClass = "." + headerClassName,
        subheaderClassName = "tocify-subheader",
        subheaderClass = "." + subheaderClassName,
        itemClassName = "tocify-item",
        itemClass = "." + itemClassName,
        extendPageClassName = "tocify-extend-page",
        extendPageClass = "." + extendPageClassName;

    // Calling the jQueryUI Widget Factory Method
    $.widget("toc.tocify", {

        //Plugin version
        version: "1.9.0",

        // These options will be used as defaults
        options: {

            // **context**: Accepts String: Any jQuery selector
            // The container element that holds all of the elements used to generate the table of contents
            context: "body",

            // **ignoreSelector**: Accepts String: Any jQuery selector
            // A selector to any element that would be matched by selectors that you wish to be ignored
            ignoreSelector: null,

            // **selectors**: Accepts an Array of Strings: Any jQuery selectors
            // The element's used to generate the table of contents.  The order is very important since it will determine the table of content's nesting structure
            selectors: "h1, h2, h3",

            // **showAndHide**: Accepts a boolean: true or false
            // Used to determine if elements should be shown and hidden
            showAndHide: true,

            // **showEffect**: Accepts String: "none", "fadeIn", "show", or "slideDown"
            // Used to display any of the table of contents nested items
            showEffect: "slideDown",

            // **showEffectSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
            // The time duration of the show animation
            showEffectSpeed: "medium",

            // **hideEffect**: Accepts String: "none", "fadeOut", "hide", or "slideUp"
            // Used to hide any of the table of contents nested items
            hideEffect: "slideUp",

            // **hideEffectSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
            // The time duration of the hide animation
            hideEffectSpeed: "medium",

            // **smoothScroll**: Accepts a boolean: true or false
            // Determines if a jQuery animation should be used to scroll to specific table of contents items on the page
            smoothScroll: true,

            // **smoothScrollSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
            // The time duration of the smoothScroll animation
            smoothScrollSpeed: "medium",

            // **scrollTo**: Accepts Number (pixels)
            // The amount of space between the top of page and the selected table of contents item after the page has been scrolled
            scrollTo: 0,

            // **showAndHideOnScroll**: Accepts a boolean: true or false
            // Determines if table of contents nested items should be shown and hidden while scrolling
            showAndHideOnScroll: true,

            // **highlightOnScroll**: Accepts a boolean: true or false
            // Determines if table of contents nested items should be highlighted (set to a different color) while scrolling
            highlightOnScroll: true,

            // **highlightOffset**: Accepts a number
            // The offset distance in pixels to trigger the next active table of contents item
            highlightOffset: 40,

            // **theme**: Accepts a string: "bootstrap", "jqueryui", or "none"
            // Determines if Twitter Bootstrap, jQueryUI, or Tocify classes should be added to the table of contents
            theme: "bootstrap",

            // **extendPage**: Accepts a boolean: true or false
            // If a user scrolls to the bottom of the page and the page is not tall enough to scroll to the last table of contents item, then the page height is increased
            extendPage: true,

            // **extendPageOffset**: Accepts a number: pixels
            // How close to the bottom of the page a user must scroll before the page is extended
            extendPageOffset: 100,

            // **history**: Accepts a boolean: true or false
            // Adds a hash to the page url to maintain history
            history: true,

            // **scrollHistory**: Accepts a boolean: true or false
            // Adds a hash to the page url, to maintain history, when scrolling to a TOC item
            scrollHistory: false,

            // **hashGenerator**: How the hash value (the anchor segment of the URL, following the
            // # character) will be generated.
            //
            // "compact" (default) - #CompressesEverythingTogether
            // "pretty" - #looks-like-a-nice-url-and-is-easily-readable
            // function(text, element){} - Your own hash generation function that accepts the text as an
            // argument, and returns the hash value.
            hashGenerator: "compact",

            // **highlightDefault**: Accepts a boolean: true or false
            // Set's the first TOC item as active if no other TOC item is active.
            highlightDefault: true

        },

        // _Create
        // -------
        //      Constructs the plugin.  Only called once.
        _create: function() {

            var self = this;

            self.extendPageScroll = true;

            // Internal array that keeps track of all TOC items (Helps to recognize if there are duplicate TOC item strings)
            self.items = [];

            // Generates the HTML for the dynamic table of contents
            self._generateToc();

            // Adds CSS classes to the newly generated table of contents HTML
            self._addCSSClasses();

            self.webkit = (function() {

                for(var prop in window) {

                    if(prop) {

                        if(prop.toLowerCase().indexOf("webkit") !== -1) {

                            return true;

                        }

                    }

                }

                return false;

            }());

            // Adds jQuery event handlers to the newly generated table of contents
            self._setEventHandlers();

            // Binding to the Window load event to make sure the correct scrollTop is calculated
            $(window).load(function() {

                // Sets the active TOC item
                self._setActiveElement(true);

                // Once all animations on the page are complete, this callback function will be called
                $("html, body").promise().done(function() {

                    setTimeout(function() {

                        self.extendPageScroll = false;

                    },0);

                });

            });

        },

        // _generateToc
        // ------------
        //      Generates the HTML for the dynamic table of contents
        _generateToc: function() {

            // _Local variables_

            // Stores the plugin context in the self variable
            var self = this,

                // All of the HTML tags found within the context provided (i.e. body) that match the top level jQuery selector above
                firstElem,

                // Instantiated variable that will store the top level newly created unordered list DOM element
                ul,
                ignoreSelector = self.options.ignoreSelector;

             // If the selectors option has a comma within the string
             if(this.options.selectors.indexOf(",") !== -1) {

                 // Grabs the first selector from the string
                 firstElem = $(this.options.context).find(this.options.selectors.replace(/ /g,"").substr(0, this.options.selectors.indexOf(",")));

             }

             // If the selectors option does not have a comman within the string
             else {

                 // Grabs the first selector from the string and makes sure there are no spaces
                 firstElem = $(this.options.context).find(this.options.selectors.replace(/ /g,""));

             }

            if(!firstElem.length) {

                self.element.addClass(hideTocClassName);

                return;

            }

            self.element.addClass(tocClassName);

            // Loops through each top level selector
            firstElem.each(function(index) {

                //If the element matches the ignoreSelector then we skip it
                if($(this).is(ignoreSelector)) {
                    return;
                }

                // Creates an unordered list HTML element and adds a dynamic ID and standard class name
                ul = $("<ul/>", {
                    "id": headerClassName + index,
                    "class": headerClassName
                }).

                // Appends a top level list item HTML element to the previously created HTML header
                append(self._nestElements($(this), index));

                // Add the created unordered list element to the HTML element calling the plugin
                self.element.append(ul);

                // Finds all of the HTML tags between the header and subheader elements
                $(this).nextUntil(this.nodeName.toLowerCase()).each(function() {

                    // If there are no nested subheader elemements
                    if($(this).find(self.options.selectors).length === 0) {

                        // Loops through all of the subheader elements
                        $(this).filter(self.options.selectors).each(function() {

                            //If the element matches the ignoreSelector then we skip it
                            if($(this).is(ignoreSelector)) {
                                return;
                            }

                            self._appendSubheaders.call(this, self, ul);

                        });

                    }

                    // If there are nested subheader elements
                    else {

                        // Loops through all of the subheader elements
                        $(this).find(self.options.selectors).each(function() {

                            //If the element matches the ignoreSelector then we skip it
                            if($(this).is(ignoreSelector)) {
                                return;
                            }

                            self._appendSubheaders.call(this, self, ul);

                        });

                    }

                });

            });

        },

        _setActiveElement: function(pageload) {

            var self = this,

                hash = window.location.hash.substring(1),

                elem = self.element.find('li[data-unique="' + hash + '"]');

            if(hash.length) {

                // Removes highlighting from all of the list item's
                self.element.find("." + self.focusClass).removeClass(self.focusClass);

                // Highlights the current list item that was clicked
                elem.addClass(self.focusClass);

                // If the showAndHide option is true
                if(self.options.showAndHide) {

                    // Triggers the click event on the currently focused TOC item
                    elem.click();

                }

            }

            else {

                // Removes highlighting from all of the list item's
                self.element.find("." + self.focusClass).removeClass(self.focusClass);

                if(!hash.length && pageload && self.options.highlightDefault) {

                    // Highlights the first TOC item if no other items are highlighted
                    self.element.find(itemClass).first().addClass(self.focusClass);

                }

            }

            return self;

        },

        // _nestElements
        // -------------
        //      Helps create the table of contents list by appending nested list items
        _nestElements: function(self, index) {

            var arr, item, hashValue;

            arr = $.grep(this.items, function (item) {

                return item === self.text();

            });

            // If there is already a duplicate TOC item
            if(arr.length) {

                // Adds the current TOC item text and index (for slight randomization) to the internal array
                this.items.push(self.text() + index);

            }

            // If there not a duplicate TOC item
            else {

                // Adds the current TOC item text to the internal array
                this.items.push(self.text());

            }

            hashValue = this._generateHashValue(arr, self, index);

            // Appends a list item HTML element to the last unordered list HTML element found within the HTML element calling the plugin
            item = $("<li/>", {

                // Sets a common class name to the list item
                "class": itemClassName,

                "data-unique": hashValue

            }).append($("<a/>", {

                "text": self.text()

            }));

            // Adds an HTML anchor tag before the currently traversed HTML element
            self.before($("<div/>", {

                // Sets a name attribute on the anchor tag to the text of the currently traversed HTML element (also making sure that all whitespace is replaced with an underscore)
                "name": hashValue,

                "data-unique": hashValue

            }));

            return item;

        },

        // _generateHashValue
        // ------------------
        //      Generates the hash value that will be used to refer to each item.
        _generateHashValue: function(arr, self, index) {

            var hashValue = "",
                hashGeneratorOption = this.options.hashGenerator;

            if (hashGeneratorOption === "pretty") {

                // prettify the text
                hashValue = self.text().toLowerCase().replace(/\s/g, "-");

                // fix double hyphens
                while (hashValue.indexOf("--") > -1) {
                    hashValue = hashValue.replace(/--/g, "-");
                }

                // fix colon-space instances
                while (hashValue.indexOf(":-") > -1) {
                    hashValue = hashValue.replace(/:-/g, "-");
                }

            } else if (typeof hashGeneratorOption === "function") {

                // call the function
                hashValue = hashGeneratorOption(self.text(), self);

            } else {

                // compact - the default
                hashValue = self.text().replace(/\s/g, "");

            }

            // add the index if we need to
            if (arr.length) { hashValue += ""+index; }

            // return the value
            return hashValue;

        },

        // _appendElements
        // ---------------
        //      Helps create the table of contents list by appending subheader elements

        _appendSubheaders: function(self, ul) {

            // The current element index
            var index = $(this).index(self.options.selectors),

                // Finds the previous header DOM element
                previousHeader = $(self.options.selectors).eq(index - 1),

                currentTagName = +$(this).prop("tagName").charAt(1),

                previousTagName = +previousHeader.prop("tagName").charAt(1),

                lastSubheader;

            // If the current header DOM element is smaller than the previous header DOM element or the first subheader
            if(currentTagName < previousTagName) {

                // Selects the last unordered list HTML found within the HTML element calling the plugin
                self.element.find(subheaderClass + "[data-tag=" + currentTagName + "]").last().append(self._nestElements($(this), index));

            }

            // If the current header DOM element is the same type of header(eg. h4) as the previous header DOM element
            else if(currentTagName === previousTagName) {

                ul.find(itemClass).last().after(self._nestElements($(this), index));

            }

            else {

                // Selects the last unordered list HTML found within the HTML element calling the plugin
                ul.find(itemClass).last().

                // Appends an unorderedList HTML element to the dynamic `unorderedList` variable and sets a common class name
                after($("<ul/>", {

                    "class": subheaderClassName,

                    "data-tag": currentTagName

                })).next(subheaderClass).

                // Appends a list item HTML element to the last unordered list HTML element found within the HTML element calling the plugin
                append(self._nestElements($(this), index));
            }

        },

       // _setEventHandlers
        // ----------------
        //      Adds jQuery event handlers to the newly generated table of contents
        _setEventHandlers: function() {

            // _Local variables_

            // Stores the plugin context in the self variable
            var self = this,

                // Instantiates a new variable that will be used to hold a specific element's context
                $self,

                // Instantiates a new variable that will be used to determine the smoothScroll animation time duration
                duration;

            // Event delegation that looks for any clicks on list item elements inside of the HTML element calling the plugin
            this.element.on("click.tocify", "li", function(event) {

                if(self.options.history) {

                    window.location.hash = $(this).attr("data-unique");

                }

                // Removes highlighting from all of the list item's
                self.element.find("." + self.focusClass).removeClass(self.focusClass);

                // Highlights the current list item that was clicked
                $(this).addClass(self.focusClass);

                // If the showAndHide option is true
                if(self.options.showAndHide) {

                    var elem = $('li[data-unique="' + $(this).attr("data-unique") + '"]');

                    self._triggerShow(elem);

                }

                self._scrollTo($(this));

            });

            // Mouseenter and Mouseleave event handlers for the list item's within the HTML element calling the plugin
            this.element.find("li").on({

                // Mouseenter event handler
                "mouseenter.tocify": function() {

                    // Adds a hover CSS class to the current list item
                    $(this).addClass(self.hoverClass);

                    // Makes sure the cursor is set to the pointer icon
                    $(this).css("cursor", "pointer");

                },

                // Mouseleave event handler
                "mouseleave.tocify": function() {

                    if(self.options.theme !== "bootstrap") {

                        // Removes the hover CSS class from the current list item
                        $(this).removeClass(self.hoverClass);

                    }

                }
            });

            // only attach handler if needed (expensive in IE)
            if (self.options.extendPage || self.options.highlightOnScroll || self.options.scrollHistory || self.options.showAndHideOnScroll)
            {
            // Window scroll event handler
                $(window).on("scroll.tocify", function() {

                    // Once all animations on the page are complete, this callback function will be called
                    $("html, body").promise().done(function() {

                        // Local variables

                        // Stores how far the user has scrolled
                        var winScrollTop = $(window).scrollTop(),

                            // Stores the height of the window
                            winHeight = $(window).height(),

                            // Stores the height of the document
                            docHeight = $(document).height(),

                            scrollHeight = $("body")[0].scrollHeight,

                            // Instantiates a variable that will be used to hold a selected HTML element
                            elem,

                            lastElem,

                            lastElemOffset,

                            currentElem;

                        if(self.options.extendPage) {

                            // If the user has scrolled to the bottom of the page and the last toc item is not focused
                            if((self.webkit && winScrollTop >= scrollHeight - winHeight - self.options.extendPageOffset) || (!self.webkit && winHeight + winScrollTop > docHeight - self.options.extendPageOffset)) {

                                if(!$(extendPageClass).length) {

                                    lastElem = $('div[data-unique="' + $(itemClass).last().attr("data-unique") + '"]');

                                    if(!lastElem.length) return;

                                    // Gets the top offset of the page header that is linked to the last toc item
                                    lastElemOffset = lastElem.offset().top;

                                    // Appends a div to the bottom of the page and sets the height to the difference of the window scrollTop and the last element's position top offset
                                    $(self.options.context).append($("<div />", {

                                        "class": extendPageClassName,

                                        "height": Math.abs(lastElemOffset - winScrollTop) + "px",

                                        "data-unique": extendPageClassName

                                    }));

                                    if(self.extendPageScroll) {

                                        currentElem = self.element.find('li.active');

                                        self._scrollTo($('div[data-unique="' + currentElem.attr("data-unique") + '"]'));

                                    }

                                }

                            }

                        }

                        // The zero timeout ensures the following code is run after the scroll events
                        setTimeout(function() {

                            // _Local variables_

                            // Stores the distance to the closest anchor
                            var closestAnchorDistance = null,

                                // Stores the index of the closest anchor
                                closestAnchorIdx = null,

                                // Keeps a reference to all anchors
                                anchors = $(self.options.context).find("div[data-unique]"),

                                anchorText;

                            // Determines the index of the closest anchor
                            anchors.each(function(idx) {
                                var distance = Math.abs(($(this).next().length ? $(this).next() : $(this)).offset().top - winScrollTop - self.options.highlightOffset);
                                if (closestAnchorDistance == null || distance < closestAnchorDistance) {
                                    closestAnchorDistance = distance;
                                    closestAnchorIdx = idx;
                                } else {
                                    return false;
                                }
                            });

                            anchorText = $(anchors[closestAnchorIdx]).attr("data-unique");

                            // Stores the list item HTML element that corresponds to the currently traversed anchor tag
                            elem = $('li[data-unique="' + anchorText + '"]');

                            // If the `highlightOnScroll` option is true and a next element is found
                            if(self.options.highlightOnScroll && elem.length) {

                                // Removes highlighting from all of the list item's
                                self.element.find("." + self.focusClass).removeClass(self.focusClass);

                                // Highlights the corresponding list item
                                elem.addClass(self.focusClass);

                            }

                            if(self.options.scrollHistory) {

                                if(window.location.hash !== "#" + anchorText) {

                                    window.location.replace("#" + anchorText);

                                }
                            }

                            // If the `showAndHideOnScroll` option is true
                            if(self.options.showAndHideOnScroll && self.options.showAndHide) {

                                self._triggerShow(elem, true);

                            }

                        }, 0);

                    });

                });
            }

        },

        // Show
        // ----
        //      Opens the current sub-header
        show: function(elem, scroll) {

            // Stores the plugin context in the `self` variable
            var self = this,
                element = elem;

            // If the sub-header is not already visible
            if (!elem.is(":visible")) {

                // If the current element does not have any nested subheaders, is not a header, and its parent is not visible
                if(!elem.find(subheaderClass).length && !elem.parent().is(headerClass) && !elem.parent().is(":visible")) {

                    // Sets the current element to all of the subheaders within the current header
                    elem = elem.parents(subheaderClass).add(elem);

                }

                // If the current element does not have any nested subheaders and is not a header
                else if(!elem.children(subheaderClass).length && !elem.parent().is(headerClass)) {

                    // Sets the current element to the closest subheader
                    elem = elem.closest(subheaderClass);

                }

                //Determines what jQuery effect to use
                switch (self.options.showEffect) {

                    //Uses `no effect`
                    case "none":

                        elem.show();

                    break;

                    //Uses the jQuery `show` special effect
                    case "show":

                        elem.show(self.options.showEffectSpeed);

                    break;

                    //Uses the jQuery `slideDown` special effect
                    case "slideDown":

                        elem.slideDown(self.options.showEffectSpeed);

                    break;

                    //Uses the jQuery `fadeIn` special effect
                    case "fadeIn":

                        elem.fadeIn(self.options.showEffectSpeed);

                    break;

                    //If none of the above options were passed, then a `jQueryUI show effect` is expected
                    default:

                        elem.show();

                    break;

                }

            }

            // If the current subheader parent element is a header
            if(elem.parent().is(headerClass)) {

                // Hides all non-active sub-headers
                self.hide($(subheaderClass).not(elem));

            }

            // If the current subheader parent element is not a header
            else {

                // Hides all non-active sub-headers
                self.hide($(subheaderClass).not(elem.closest(headerClass).find(subheaderClass).not(elem.siblings())));

            }

            // Maintains chainablity
            return self;

        },

        // Hide
        // ----
        //      Closes the current sub-header
        hide: function(elem) {

            // Stores the plugin context in the `self` variable
            var self = this;

            //Determines what jQuery effect to use
            switch (self.options.hideEffect) {

                // Uses `no effect`
                case "none":

                    elem.hide();

                break;

                // Uses the jQuery `hide` special effect
                case "hide":

                    elem.hide(self.options.hideEffectSpeed);

                break;

                // Uses the jQuery `slideUp` special effect
                case "slideUp":

                    elem.slideUp(self.options.hideEffectSpeed);

                break;

                // Uses the jQuery `fadeOut` special effect
                case "fadeOut":

                    elem.fadeOut(self.options.hideEffectSpeed);

                break;

                // If none of the above options were passed, then a `jqueryUI hide effect` is expected
                default:

                    elem.hide();

                break;

            }

            // Maintains chainablity
            return self;
        },

        // _triggerShow
        // ------------
        //      Determines what elements get shown on scroll and click
        _triggerShow: function(elem, scroll) {

            var self = this;

            // If the current element's parent is a header element or the next element is a nested subheader element
            if(elem.parent().is(headerClass) || elem.next().is(subheaderClass)) {

                // Shows the next sub-header element
                self.show(elem.next(subheaderClass), scroll);

            }

            // If the current element's parent is a subheader element
            else if(elem.parent().is(subheaderClass)) {

                // Shows the parent sub-header element
                self.show(elem.parent(), scroll);

            }

            // Maintains chainability
            return self;

        },

        // _addCSSClasses
        // --------------
        //      Adds CSS classes to the newly generated table of contents HTML
        _addCSSClasses: function() {

            // If the user wants a jqueryUI theme
            if(this.options.theme === "jqueryui") {

                this.focusClass = "ui-state-default";

                this.hoverClass = "ui-state-hover";

                //Adds the default styling to the dropdown list
                this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content");

            }

            // If the user wants a twitterBootstrap theme
            else if(this.options.theme === "bootstrap") {

                this.element.find(headerClass + "," + subheaderClass).addClass("nav nav-list");

                this.focusClass = "active";

            }

            // If a user does not want a prebuilt theme
            else {

                // Adds more neutral classes (instead of jqueryui)

                this.focusClass = tocFocusClassName;

                this.hoverClass = tocHoverClassName;

            }

            //Maintains chainability
            return this;

        },

        // setOption
        // ---------
        //      Sets a single Tocify option after the plugin is invoked
        setOption: function() {

            // Calls the jQueryUI Widget Factory setOption method
            $.Widget.prototype._setOption.apply(this, arguments);

        },

        // setOptions
        // ----------
        //      Sets a single or multiple Tocify options after the plugin is invoked
        setOptions: function() {

            // Calls the jQueryUI Widget Factory setOptions method
            $.Widget.prototype._setOptions.apply(this, arguments);

        },

        // _scrollTo
        // ---------
        //      Scrolls to a specific element
        _scrollTo: function(elem) {

            var self = this,
                duration = self.options.smoothScroll || 0,
                scrollTo = self.options.scrollTo,
                currentDiv = $('div[data-unique="' + elem.attr("data-unique") + '"]');

            if(!currentDiv.length) {

                return self;

            }

            // Once all animations on the page are complete, this callback function will be called
            $("html, body").promise().done(function() {

                // Animates the html and body element scrolltops
                $("html, body").animate({

                    // Sets the jQuery `scrollTop` to the top offset of the HTML div tag that matches the current list item's `data-unique` tag
                    "scrollTop": currentDiv.offset().top - ($.isFunction(scrollTo) ? scrollTo.call() : scrollTo) + "px"

                }, {

                    // Sets the smoothScroll animation time duration to the smoothScrollSpeed option
                    "duration": duration

                });

            });

            // Maintains chainability
            return self;

        }

    });

})); //end of plugin

(function($){

    $(function(){

        // Hide code blocks an add a toggle button to each example that will
        // show/hide the code block for that example.
        $(".sg-code").hide();
        $(".sg-canvas").append("<button class=sg-code-toggle>Show Markup</button>");
        $(".sg-code-toggle").on("click", function() {
            var $code = $(this).parents(".sg-example").first().find(".sg-code").first();
            if ($code.length) {
                $code.toggle();
                $(this).text($code.is(":visible") ? "Hide Markup" : "Show Markup");
            }
        });

        // Setup table of contents navigation
        $(".sg-toc").tocify({
            selectors: "h2.sg,h3.sg",
            highlightDefault: false,
            theme: "none",
            showEffect: "none",
            hideEffect: "none",
            smoothScroll: false,
            showAndHide: true
        });

    });

}(window.jQuery));
