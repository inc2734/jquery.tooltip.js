/**
* jquery.toolTip.js
* Description: ツールチップ（ポップアップヒント）を表示するjQueryプラグイン
* Version: 1.1.1
* Author: Takashi Kitajima
* Autho URI: http://2inc.org
* created: May 13, 2012
* modified : May 23, 2012
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
			$(elem).hover( function( e ) {
				if ( $(elem).find( '#jToolTip' ).size() > 0 ) return;
				_title = $(elem).attr( 'title' );
				if ( !_title ) {
					title = $(this).find( '.jToolTip_a' ).html();
				} else {
					title = _title;
					// title属性退避
					$(this).attr( 'title', '' );
				}
				// ツールチップ生成
				tooltip = $('<div/>')
					.attr( 'id', 'jToolTip' )
					.html( title )
					.appendTo( elem );
				// ブラウザにかぶるときは位置反転
				if ( e.pageX + tooltip.width() > getWindowWidth() - 50 ) {
					posX = e.pageX - tooltip.width() - 30;
				} else {
					posX = e.pageX + 15;
				}
				tooltip.css( {
					top: e.pageY - 15,
					left: posX
				});
			},
			// ロールアウト時
			function() {
				if ( _title ) {
					// title属性復活
					$(this).attr( 'title', title );
				}
				tooltip.fadeOut( 200, function() {
					$(this).hide().remove();
				} );
			} );
		});
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
})( jQuery );
jQuery(function( $ ) {
	$('.jToolTip_q').toolTip();
} );