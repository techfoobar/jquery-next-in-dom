/*!
 * jQuery Next-In-Dom
 * http://techfoobar.com/jquery-next-in-dom/
 * 
 * Copyright (c) 2013 Vijayakrishnan Krishnan
 * Released under the MIT License
 * http://techfoobar.com/jquery-next-in-dom/LICENSE.MIT
 */
 (function($) {
 
	$.fn.nextInDOM = function(selector) {
		// NOTE: if multiple elements specified, only the first is considered
		var element = this;
		if(this.length > 1) element = this.first();
		return nextInDOM(selector?selector:'*', element, $('*').length, $('*').last());
	};
	
	$.fn.prevInDOM = function(selector) {
		// NOTE: if multiple elements specified, only the first is considered
		var element = this;
		if(this.length > 1) element = this.first();
		return prevInDOM(selector?selector:'*', element, $('*').length, $('*').first());
	};
	
	// next in dom implementation
	function nextInDOM(_selector, _subject, _maxNodes, _lastNode) {
		var nid = $(), next = getNext(_subject, _lastNode), iters = 1;
		$('html, body').addClass('cSeen');
	    while(next.length != 0) {
			if(iters > _maxNodes) return $();
			if(next.is(_selector)) {
				nid = next;
				break;
			}
	        next = getNext(next, _lastNode);
			iters++;
	    }
	    $('.cSeen').removeClass('cSeen');
	    return nid;
	}
	
	/*
	finding next (e) {
		if e has children & !e.traversed
			n = e.children.first
		else if e has next
			n = e.next
		else if e has parent
			e.parent.traversed = true
			n = next(e.parent)
		else n = null;
	}
	*/
	function getNext(_subject, _lastNode) {
		if(_subject[0] == _lastNode[0]) return $();
		if(!(_subject.hasClass('cSeen')) && _subject.children().length > 0) return _subject.children().first();
		else if(_subject.next().length > 0) return _subject.next();
		else if (_subject.parent().length > 0) {
			_subject.parent().addClass('cSeen');
			return getNext(_subject.parent(), _lastNode);
		}
	    return $();
	}
	
	// prev in dom implementation
	function prevInDOM(_selector, _subject, _maxNodes, _firstNode) {
	    var prev = getPrev(_subject, _firstNode), iters = 1;
		while(prev.length != 0) {
			if(iters > _maxNodes) return $();
	    	if(prev.is(_selector)) return prev;
	    	prev = getPrev(prev, _firstNode);
			iters++;
	    }
	    return $();
	}
	
	/*
	if e has prev and e.prev has children {
		n = deepest and farthest child of e.prev
	}
	else if e has prev {
		n = e.prev
	}
	else if e has parent {
		n = e.parent
	}
	*/
	function getPrev(_subject, _firstNode) {
		if(_subject[0] == _firstNode[0]) return $();
	    if(_subject.prev().length > 0 && _subject.prev().children().length > 0) {
			var p = _subject.prev().children().last();
			while(p.children().length > 0) p = p.children().last();
			return p;
		}
		else if(_subject.prev().length > 0) {
			return _subject.prev();
		}
		else if(_subject.parent().length > 0) {
			return _subject.parent();
		}
		return $();
	}
	
})(jQuery);