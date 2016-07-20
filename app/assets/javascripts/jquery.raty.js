(function($) {
  $.fn.raty = function(settings) {
    options = $.extend({}, $.fn.raty.defaults, settings);
    if (this.attr('id') === undefined) {
      debug('Invalid selector!'); return;
    }
    if (options.number > 20) {
      options.number = 20;
    } else if (options.number < 0) {
      options.number = 0;
    }
    if (options.path.substring(options.path.length - 1,
      options.path.length) != '/') {
      options.path += '/';
    }
    $global = $(this);
      var $this			= $global,
      containerId		= $global.attr('id'),
      path			= options.path,
      cancelOff		= options.cancelOff,
      cancelOn		= options.cancelOn,
      showHalf		= options.showHalf,
      starHalf		= options.starHalf,
      starOff			= options.starOff,
      starOn			= options.starOn,
      onClick			= options.onClick,
      start			= 0,
      hint			= '';
      if (!isNaN(options.start) && options.start > 0) {
        start = (options.start > options.number) ? options.number : options.start;
      }
      for (var i = 1; i <= options.number; i++) {
        hint = (options.number <= options.hintList.length &&
          options.hintList[i - 1] !== null) ? options.hintList[i - 1] : i;
        starFile = (start >= i) ? starOn : starOff;
        $this.append('<img id="' + containerId + '-' + i + '" src="' + path
          + starFile + '" alt="' + i + '" title="' + hint + '" class="'
          + containerId + '"/>').append((i < options.number) ? '&nbsp;' : '');
         }
      $this.append('<input id="' + containerId + '-score" type="hidden" name="'
        + options.scoreName + '"/>');
      $('#' + containerId + '-score').val(start);
      if (showHalf) {
        var score = $('input#' + containerId + '-score').val(),
        rounded = Math.ceil(score),
        diff = (rounded - score).toFixed(1);
        if (diff >= 0.3 && diff <= 0.7) {
          rounded = rounded - 0.5;
          $('img#' + containerId + '-' + Math.ceil(rounded)).attr('src',
            path + starHalf);
        } else if (diff >= 0.8) {
          rounded--;
          } else {
            $('img#' + containerId + '-' + rounded).attr('src', path + starOn);
           }
        }
      if (!options.readOnly) {
        if (options.showCancel) {
          var cancel = '<img src="' + path + options.cancelOff +
            '" alt="x" title="' + options.cancelHint + '" class="button-cancel"/>';
            if (options.cancelPlace == 'left') {
              $this.prepend(cancel + '&nbsp;');
            } else {
              $this.append('&nbsp;').append(cancel);
            }
           $this.css('width', options.number * 20 + 20);
           $('#' + containerId + ' img.button-cancel')
        .live('mouseenter', function() {
           $(this).attr('src', path + cancelOn);
           $('img.' + containerId).attr('src', path + starOff);
          })
        .live('mouseleave', function() {
          $(this).attr('src', path + cancelOff);
          $('img.' + containerId).trigger('mouseout');
				})
				.live('click', function() {
				  $('input#' + containerId + '-score').val(0);
				  if (onClick) {
				    onClick.apply($this, [0]);
				  }
				});
			} else {
			  $this.css('width', options.number * 20);
			}
			$('img.' + containerId)
			.live('mouseenter', function() {
			  var qtyStar = $('img.' + containerId).length;
			  for (var i = 1; i <= qtyStar; i++) {
			    if (i <= this.alt) {
			      $('img#' + containerId + '-' + i).attr('src', path + starOn);
			    } else {
			      $('img#' + containerId + '-' + i).attr('src', path + starOff);
			    }
			  }
			})
			.live('click', function() {
			  $('input#' + containerId + '-score').val(this.alt);
			  if (onClick) {
			    onClick.apply($this, [this.alt]);
			  }
			});
			  $this.live('mouseleave', function() {
			  var id = $(this).attr('id'),
			    qtyStar = $('img.' + id).length,
			    score = $('input#' + id + '-score').val();
			    for (var i = 1; i <= qtyStar; i++) {
			      if (i <= score) {
			        $('img#' + id + '-' + i).attr('src', path + starOn);
			      } else {
			        $('img#' + id + '-' + i).attr('src', path + starOff);
			      }
			    }
			    if (showHalf) {
			    var score = $('input#' + id + '-score').val(),
			      rounded = Math.ceil(score),
			      diff = (rounded - score).toFixed(1);
			      if (diff >= 0.3 && diff <= 0.7) {
			        rounded = rounded - 0.5;
			        $('img#' + id + '-' + Math.ceil(rounded)).attr('src', path + starHalf);
			      } else if (diff >= 0.8) {
			        rounded--;
			      } else {
			        $('img#' + id + '-' + rounded).attr('src', path + starOn);
			      }
			    }
			    }).css('cursor', 'pointer');
			    } else {
			      hint = (options.number <= options.hintList.length &&
			        options.hintList[start - 1] !== null) ? options.hintList[start - 1] : start;
			  $this
			  .css('cursor', 'default').attr('title', hint)
			  .children('img').attr('title', hint);
			}
		return $this;
	};
	$.fn.raty.defaults = {
	  cancelHint:		'cancel this rating!',
	  cancelOff:		'cancel-off.png',
	  cancelOn:		'cancel-on.png',
	  cancelPlace:	'left',
	  hintList:		['bad', 'poor', 'regular', 'good', 'gorgeous'],
	  number:			5,
	  path:			'img/',
	  readOnly:		false,
	  scoreName:		'score',
	  showCancel:		false,
	  showHalf:		false,
	  starHalf:		'star-half.png',
	  start:			0,
	  starOff:		'star-off.png',
	  starOn:			'star-on.png'
	  //onClick:		function() { alert('clicked!'); }
	};
	$.fn.raty.readOnly = function(boo) {
	  if (boo) {
	    $('img.' + $global.attr('id')).die();
	    $global.css('cursor', 'default').die();
	  } else {
	    liveEnter();
	    liveLeave();
	    liveClick();
	    $global.css('cursor', 'pointer');
	    }
	  return $.fn.raty;
	};
	$.fn.raty.start = function(start) {
	  initialize(start);
	  return $.fn.raty;
	};
	$.fn.raty.click = function(score) {
	  var star = (score >= options.number) ? options.number : score;
	  initialize(star);
	  if (options.onClick) {
	    options.onClick.apply($this, [star]);
	  } else {
	    debug('You should add the "onClick: function() {}" option.');
	  }
	  return $.fn.raty;
	};
	function liveEnter() {
	  var id = $global.attr('id');
	  $('img.' + id).live('mouseenter', function() {
	    var qtyStar = $('img.' + id).length;
	    for (var i = 1; i <= qtyStar; i++) {
	      if (i <= this.alt) {
	        $('img#' + id + '-' + i).attr('src', options.path + options.starOn);
	      } else {
	        $('img#' + id + '-' + i).attr('src', options.path + options.starOff);
	      }
	    }
	  });
	};
	function liveLeave() {
	  $global.live('mouseleave', function() {
	    var id = $(this).attr('id'),
	      qtyStar = $('img.' + id).length,
	      score = $('input#' + id + '-score').val();
	    for (var i = 1; i <= qtyStar; i++) {
	      if (i <= score) {
	        $('img#' + id + '-' + i).attr('src', options.path + options.starOn);
	      } else {
	        $('img#' + id + '-' + i).attr('src', options.path + options.starOff);
	      }
	    }
	  });
	};
	function liveClick() {
	  var id = $global.attr('id');
	  $('img.' + id).live('click', function() {
	    $('input#' + id + '-score').val(this.alt);
	  });
	};
	function initialize(start) {
	  var id = $global.attr('id'),
	    qtyStar = $('img.' + id).length;
	  $('input#' + id + '-score').val(start);
	  for (var i = 1; i <= qtyStar; i++) {
	    if (i <= start) {
	      $('img#' + id + '-' + i).attr('src', options.path + options.starOn);
	    } else {
	      $('img#' + id + '-' + i).attr('src', options.path + options.starOff);
	    }
	  }
	};
	function debug(message) {
	  if (window.console && window.console.log) {
	    window.console.log(message);
	  }
	};
})
(jQuery);
