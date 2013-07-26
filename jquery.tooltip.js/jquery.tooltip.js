/**
* jquery.toolTip.js
* Description: ツールチップ（ポップアップヒント）を表示するjQueryプラグイン
* Version: 1.2
* Author: Takashi Kitajima
* Autho URI: http://2inc.org
* created: May 13, 2012
* modified : Jyly 26, 2013
* License: GPL2
*
* Copyright 2012 Takashi Kitajima (email : inc@2inc.org)
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License, version 2, as
* published by the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
*/
( function( $ ) {
	$.fn.toolTip = function( config ) {
		var defaults = {
		};
		config = $.extend( defaults, config );
		var posX = '';
		var tooltip = '';
		var _title = '';
		var title = '';
		return this.each( function( i, elem ) {
			// ロールオーバー時
			$( elem ).hover( function( e ) {
				if ( $( elem ).find( '#jToolTip' ).size() > 0 ) return;
				_title = $( elem ).attr( 'title' );
				if ( !_title ) {
					title = $(this).find( '.jToolTip_a' ).html();
				} else {
					title = _title;
					// title属性退避
					$( this ).attr( 'title', '' );
				}
				// ツールチップ生成
				tooltip = $( '<div/>' )
					.attr( 'id', 'jToolTip' )
					.html( title )
					.appendTo( elem );

				var elem_css_top  = $( elem ).position().top;
				var elem_css_left = $( elem ).position().left;
				var mouse_pageY = e.pageY;
				var mouse_pageX = e.pageX;
				var elem_pageY = $( elem ).offset().top;
				var elem_pageX = $( elem ).offset().left;
				var relativeY = mouse_pageY - elem_pageY;
				var relativeX = mouse_pageX - elem_pageX;

				// ブラウザにかぶるときは位置反転
				if ( elem_css_left + relativeX + tooltip.width() > getWindowWidth() - 50 ) {
					posX = elem_css_left + relativeX - tooltip.width() - 30;
				} else {
					posX = elem_css_left + relativeX + 15;
				}
				tooltip.css( {
					top: elem_css_top + relativeY - 15,
					left: posX
				} );
			},
			// ロールアウト時
			function() {
				if ( _title ) {
					// title属性復活
					$( this ).attr( 'title', title );
				}
				tooltip.fadeOut( 200, function() {
					$( this ).hide().remove();
				} );
			} );
		} );
	};

	function getWindowWidth() {
		if ( window.innerWidth ) {
			return window.innerWidth;
		} else if ( document.documentElement && document.documentElement.clientWidth ) {
			return document.documentElement.clientWidth;
		} else if ( document.body && document.body.clientWidth){
			return document.body.clientWidth;
		}
	}
} )( jQuery );
jQuery( function( $ ) {
	$( '.jToolTip_q' ).toolTip();
} );