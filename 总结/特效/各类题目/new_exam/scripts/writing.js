function InitAction () {
    var b = $
    var c = cursor();
    var e = {
        ele: "inputEmail3",
        clipData: "",
        curRange: {},
        cssCount: "#js-writingArea .numbers",
        init: function() {
            var a = {
                copy: ".js-copy",
                cut: ".js-cut",
                paste: ".js-paste"
            }
              , c = this
              , d = document.getElementById(this.ele);
            b(a.cut).on("click", function() {
                c.cut.call(c, d, c.wordCount)
            }),
            b(a.copy).on("click", function() {
                c.copy.call(c, d)
            }),
            b(a.paste).on("click", function() {
                c.paste.call(c, d, c.wordCount)
            }),
            b("#" + this.ele).on("keyup", function() {
                c.wordCount.call(c, d)
            })
        },
        cut: function(a, b) {
            var d = c.get(a)
              , e = a.value.slice(0, d.start)
              , f = a.value.slice(d.end)
              , g = d.start;
            if ("" != d.text)
                return this.clipData = d.text,
                a.value = e + f,
                c.set(a, {
                    start: g,
                    end: g
                }),
                "function" == typeof b && b.call(this, a),
                !1
        },
        copy: function(a, b) {
            var d = c.get(a);
            return "" != d.text && (this.clipData = d.text,
            "function" == typeof b && b.call(this, a)),
            !1
        },
        paste: function(a, b) {
            var d;
            "" != this.clipData && (d = c.get(a),
            c.add(a, d, this.clipData),
            "function" == typeof b && b.call(this, a))
        },
        wordCount: function(a) {
            var c = b.trim(a.value)
              , d = /[\s\.\,\?\!]+/g
              , e = b.trim(c.replace(d, " ")).split(" ")
              , f = this.cssCount
              , g = 0;
            "" == c ? g = 0 : e.length && (g = e.length),
            b(f).text(g)
        }
    };
	e.init();
}

function cursor (b, c) {
	var a= $('#inputEmail3');
    var d = {
        get: function(a) {
            {
                var b = {
                    text: "",
                    start: 0,
                    end: 0
                };
                a.value
            }
            if (a.setSelectionRange)
                a.focus(),
                b.start = a.selectionStart,
                b.end = a.selectionEnd,
                b.text = a.value.substring(b.start, b.end);
            else if (document.selection) {
                a.focus();
                var c, d = document.selection.createRange(), e = document.body.createTextRange();
                for (e.moveToElementText(a),
                b.text = d.text,
                b.bookmark = d.getBookmark(),
                c = 0; e.compareEndPoints("StartToStart", d) < 0 && 0 !== d.moveStart("character", -1); c++)
                    "/r" == a.value.charAt(c) && c++;
                b.start = c,
                b.end = c + b.text.length
            }
            return b
        },
        set: function(a, b) {
            var c;
            b || alert("You must get cursor position first."),
            a.focus(),
            a.setSelectionRange ? a.setSelectionRange(b.start, b.end) : a.createTextRange && (c = a.createTextRange(),
            a.value.length === b.start ? (c.collapse(!1),
            c.select()) : (c.moveToBookmark(b.bookmark),
            c.select()))
        },
        add: function(a, b, c) {
            var d, e, f, g, h, i;
            this.set(a, b),
            a.setSelectionRange ? (d = a.value,
            e = d.substring(0, b.start) + c + d.substring(b.end),
            g = h = b.start + c.length,
            i = a.scrollTop,
            a.value = e,
            a.setSelectionRange(g, h)) : a.createTextRange && (f = document.selection.createRange(),
            f.text = c,
            f.setEndPoint("StartToEnd", f),
            f.select())
        }
    };
	return d;
}
