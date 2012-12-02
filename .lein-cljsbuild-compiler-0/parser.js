goog.provide('parser');
goog.require('cljs.core');
goog.require('clojure.string');
parser.pop_BANG_ = (function pop_BANG_(stack){
var first__6144 = cljs.core.first.call(null,cljs.core.deref.call(null,stack));
cljs.core.swap_BANG_.call(null,stack,cljs.core.pop);
return first__6144;
});
parser.push_BANG_ = (function push_BANG_(stack,item){
return cljs.core.swap_BANG_.call(null,stack,cljs.core.conj,item);
});
parser.parse = (function parse(n,evalFunction,groupPrefix){
var stack__6148 = cljs.core.atom.call(null,cljs.core.List.EMPTY);
var tokens__6149 = clojure.string.replace.call(null,clojure.string.replace.call(null,n,"("," LPAREN "),")"," RPAREN ").split(/\s/);
var tok__6150 = tokens__6149;
while(true){
if(cljs.core.empty_QMARK_.call(null,tok__6150))
{return parser.numberGroups.call(null,cljs.core.apply.call(null,cljs.core.str,parser.walk.call(null,parser.pop_BANG_.call(null,stack__6148))),groupPrefix);
} else
{evalFunction.call(null,cljs.core.last.call(null,tok__6150),stack__6148);
{
var G__6151 = cljs.core.butlast.call(null,tok__6150);
tok__6150 = G__6151;
continue;
}
}
break;
}
});
parser.walk = (function walk(l){
if((function (){var and__3822__auto____6155 = cljs.core.list_QMARK_.call(null,l);
if(and__3822__auto____6155)
{return !(cljs.core.empty_QMARK_.call(null,l));
} else
{return and__3822__auto____6155;
}
})())
{var a__6156 = walk.call(null,cljs.core.first.call(null,l));
var b__6157 = walk.call(null,cljs.core.rest.call(null,l));
return cljs.core.concat.call(null,a__6156,b__6157);
} else
{if(cljs.core.empty_QMARK_.call(null,l))
{return "";
} else
{return [cljs.core.str(l)].join('');
}
}
});
parser.numberGroups = (function numberGroups(sentence,prefix){
var s__6161 = sentence;
var v__6162 = 0;
while(true){
var idx__6163 = s__6161.indexOf("%G%");
if((idx__6163 > -1))
{{
var G__6164 = clojure.string.replace_first.call(null,s__6161,"%G%",[cljs.core.str("'"),cljs.core.str(prefix),cljs.core.str(v__6162),cljs.core.str("'")].join(''));
var G__6165 = (v__6162 + 1);
s__6161 = G__6164;
v__6162 = G__6165;
continue;
}
} else
{return s__6161;
}
break;
}
});
parser.evaluate = (function evaluate(tok,stack){
if(cljs.core._EQ_.call(null,"wave",tok))
{return parser.push_BANG_.call(null,stack,"picture.segments__GT_painter(%G%,picture.wave_segments)");
} else
{if(cljs.core._EQ_.call(null,"squash-inwards",tok))
{var a__6174 = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,cljs.core.list.call(null,"picture.squash_inwards(%G%,",a__6174,")"));
} else
{if(cljs.core._EQ_.call(null,"rotate90",tok))
{var a__6175 = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,cljs.core.list.call(null,"picture.rotate90(%G%,",a__6175,")"));
} else
{if(cljs.core._EQ_.call(null,"flip-vert",tok))
{var a__6176 = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,cljs.core.list.call(null,"picture.flip_vert(%G%,",a__6176,")"));
} else
{if(cljs.core._EQ_.call(null,"shrink-to-upper-right",tok))
{var a__6177 = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,cljs.core.list.call(null,"picture.shrink_to_upper_right(%G%,",a__6177,")"));
} else
{if(cljs.core._EQ_.call(null,"beside",tok))
{var a__6178 = parser.pop_BANG_.call(null,stack);
var b__6179 = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,cljs.core.list.call(null,"picture.beside(%G%,",a__6178,",",b__6179,")"));
} else
{if(cljs.core._EQ_.call(null,"below",tok))
{var a__6180 = parser.pop_BANG_.call(null,stack);
var b__6181 = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,cljs.core.list.call(null,"picture.below(%G%,",a__6180,",",b__6181,")"));
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
}
}
}
});
parser.evaluateHTML = (function evaluateHTML(tok,stack){
if(cljs.core._EQ_.call(null,"wave",tok))
{return parser.push_BANG_.call(null,stack,"<span id=%G%>wave</span>");
} else
{if(cljs.core._EQ_.call(null,"squash-inwards",tok))
{var a__6190 = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,cljs.core.list.call(null,"<span id=%G%>squash-inwards</span> ",a__6190));
} else
{if(cljs.core._EQ_.call(null,"rotate90",tok))
{var a__6191 = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,cljs.core.list.call(null,"<span id=%G%>rotate90</span> ",a__6191));
} else
{if(cljs.core._EQ_.call(null,"flip-vert",tok))
{var a__6192 = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,cljs.core.list.call(null,"<span id=%G%>flip-vert</span> ",a__6192));
} else
{if(cljs.core._EQ_.call(null,"shrink-to-upper-right",tok))
{var a__6193 = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,cljs.core.list.call(null,"<span id=%G%>shrink-to-upper-right</span> ",a__6193));
} else
{if(cljs.core._EQ_.call(null,"beside",tok))
{var a__6194 = parser.pop_BANG_.call(null,stack);
var b__6195 = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,cljs.core.list.call(null,"<span id=%G%>beside</span> ",a__6194," ",b__6195));
} else
{if(cljs.core._EQ_.call(null,"below",tok))
{var a__6196 = parser.pop_BANG_.call(null,stack);
var b__6197 = parser.pop_BANG_.call(null,stack);
return parser.push_BANG_.call(null,stack,cljs.core.list.call(null,"<span id=%G%>below</span> ",a__6196," ",b__6197));
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
}
}
}
});
