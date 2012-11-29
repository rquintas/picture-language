goog.provide('parser');
goog.require('cljs.core');
goog.require('goog.string.StringBuffer');
goog.require('goog.string');
parser.pop_BANG_ = (function pop_BANG_(stack){
var first = cljs.core.first.call(null,cljs.core.deref.call(null,stack));
cljs.core.swap_BANG_.call(null,stack,cljs.core.pop);
return first;
});
parser.push_BANG_ = (function push_BANG_(stack,item){
return cljs.core.swap_BANG_.call(null,stack,cljs.core.conj,item);
});
/**
* Replaces all instance of match with replacement in s.
* match/replacement can be:
* 
* string / string
* pattern / (string or function of match).
*/
parser.replace = (function replace(s,match,replacement){
if(cljs.core.string_QMARK_.call(null,match))
{return s.replace((new RegExp(goog.string.regExpEscape(match),"g")),replacement);
} else
{if(cljs.core.truth_(match.hasOwnProperty("source")))
{return s.replace((new RegExp(match.source,"g")),replacement);
} else
{if("\uFDD0'else")
{throw [cljs.core.str("Invalid match arg: "),cljs.core.str(match)].join('');
} else
{return null;
}
}
}
});
parser.parse = (function parse(n){
var stack = cljs.core.atom.call(null,cljs.core.List.EMPTY);
var tokens = parser.replace.call(null,parser.replace.call(null,n,"("," LPAREN "),")"," RPAREN ").split(/\s/);
var tok = tokens;
while(true){
if(cljs.core.empty_QMARK_.call(null,tok))
{return parser.pop_BANG_.call(null,stack);
} else
{parser.evaluate.call(null,cljs.core.last.call(null,tok),stack);
{
var G__16573 = cljs.core.butlast.call(null,tok);
tok = G__16573;
continue;
}
}
break;
}
});
goog.exportSymbol('parser.parse', parser.parse);
parser.parse2 = (function parse2(n){
var stack = cljs.core.atom.call(null,cljs.core.List.EMPTY);
var tokens = parser.replace.call(null,parser.replace.call(null,n,"("," LPAREN "),")"," RPAREN ").split(/\s/);
var tok = tokens;
while(true){
if(cljs.core.empty_QMARK_.call(null,tok))
{return stack;
} else
{parser.evaluate.call(null,cljs.core.last.call(null,tok),stack);
{
var G__16574 = cljs.core.butlast.call(null,tok);
tok = G__16574;
continue;
}
}
break;
}
});
goog.exportSymbol('parser.parse2', parser.parse2);
parser.parse3 = (function parse3(n){
var stack = cljs.core.atom.call(null,cljs.core.List.EMPTY);
var tokens = parser.replace.call(null,parser.replace.call(null,n,"("," LPAREN "),")"," RPAREN ").split(/\s/);
return tokens;
});
goog.exportSymbol('parser.parse3', parser.parse3);
parser.evaluate = (function evaluate(tok,stack){
if(cljs.core._EQ_.call(null,"wave",tok))
{return parser.push_BANG_.call(null,stack,"picture.segments__GT_painter(picture.wave_segments,lineGraph)");
} else
{if(cljs.core._EQ_.call(null,"rotate90",tok))
{var a = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,[cljs.core.str("picture.rotate90("),cljs.core.str(a),cljs.core.str(")")].join(''));
} else
{if(cljs.core._EQ_.call(null,"beside",tok))
{var a = parser.pop_BANG_.call(null,stack);
var b = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,[cljs.core.str("picture.beside("),cljs.core.str(a),cljs.core.str(","),cljs.core.str(b),cljs.core.str(")")].join(''));
} else
{if(cljs.core._EQ_.call(null,"below",tok))
{var a = parser.pop_BANG_.call(null,stack);
var b = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,[cljs.core.str("picture.below("),cljs.core.str(a),cljs.core.str(","),cljs.core.str(b),cljs.core.str(")")].join(''));
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
}
}
});
