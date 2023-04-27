("use strict");
//e.stopPropagation();  e.preventDefault();
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};
const getParent = (element, selector) => {
  while (element.parentElement) {
    if (element.parentElement.matches(selector)) {
      return element.parentElement;
    }
    element = element.parentElement;
  }
  if (element.classList.contains(selector)) {
    return element;
  }
};
const inputEl = select("#importArticle"),
  resultArticleEl = select(".resultArticle"),
  languageBtn = select(".changeLanguage"),
  welcome = select(".welcome");
let valueText = "";
inputEl.addEventListener("blur", function () {
  valueText = inputEl.value;
  if (valueText && valueText != resultArticleEl.innerHTML) {
    inputEl.value = "";
  }
});
inputEl.oninput = () => {
  resultArticleEl.innerHTML = inputEl.value;
};
inputEl.onfocus = function (e) {
  speechSynthesis.cancel();
  doGTranslate("ru|en");
  setTimeout(() => {
    speechText(welcome.innerText);
  }, 0);
};

/* ========  doGTranslate("ru|en");  ================== */

function googleTranslateElementInit2() {
  const ems = new google.translate.TranslateElement(
    {
      pageLanguage: "vi",
      autoDisplay: false,
    },
    "google_translate_element2",
  );
}
var reloadState = function () {
  var innerDoc;
  var iframe = document.querySelector(".VIpgJd-ZVi9od-ORHb-OEVmcd.skiptranslate");
  if (iframe) innerDoc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document;
  return innerDoc.getElementById(":1.close");
};

/* <![CDATA[ */
eval(
  (function (p, a, c, k, e, r) {
    e = function (c) {
      return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
    };
    if (!"".replace(/^/, String)) {
      while (c--) r[e(c)] = k[c] || e(c);
      k = [
        function (e) {
          return r[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--) if (k[c]) p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
    return p;
  })(
    "6 7(a,b){n{4(2.9){3 c=2.9(\"o\");c.p(b,f,f);a.q(c)}g{3 c=2.r();a.s('t'+b,c)}}u(e){}}6 h(a){4(a.8)a=a.8;4(a=='')v;3 b=a.w('|')[1];3 c;3 d=2.x('y');z(3 i=0;i<d.5;i++)4(d[i].A=='B-C-D')c=d[i];4(2.j('k')==E||2.j('k').l.5==0||c.5==0||c.l.5==0){F(6(){h(a)},G)}g{c.8=b;7(c,'m');7(c,'m')}}",
    43,
    43,
    "||document|var|if|length|function|GTranslateFireEvent|value|createEvent||||||true|else|doGTranslate||getElementById|google_translate_element2|innerHTML|change|try|HTMLEvents|initEvent|dispatchEvent|createEventObject|fireEvent|on|catch|return|split|getElementsByTagName|select|for|className|goog|te|combo|null|setTimeout|500".split(
      "|",
    ),
    0,
    {},
  ),
);
/* ]]> */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages:
        "af,ach,ak,am,ar,az,be,bem,bg,bh,bn,br,bs,ca,chr,ckb,co,crs,cs,cy,da,de,ee,el,en,eo,es,es-419,et,eu,fa,fi, fo,fr,fy,ga,gaa,gd,gl,gn,gu,ha,haw,hi,hr,ht,hu,hy,ia, id,ig,is,it,iw,ja,jw,ka,kg,kk,km,kn,ko,kri,ku,ky,la, lg,ln,lo,loz,lt,lua,lv,mfe,mg,mi,mk,ml,mn,mo,mr,ms,mt, ne,nl,nn,no,nso,ny,nyn,oc,om,or,pa,pcm,pl,ps,pt-BR, pt-PT,qu,rm,rn,ro,ru,rw,sd,sh,si,sk,sl,sn,so,sq,sr, sr-ME,st,su,sv,sw,ta,te,tg,th,ti,tk,tl,tn,to,tr,tt, tum,tw,ug,uk,ur,uz,vi,wo,xh,yi,yo,zh-CN,zh-TW,zu",
      layout: google.translate.TranslateElement.InlineLayout.VERTICAL,
    },
    "google_translate_element",
  );
}

/* ===================================================================== */

//<![CDATA[
const rate = document.querySelector("#rate");
var voices, text, langs, Mc;

window.addEventListener("click", checkWord);
function checkWord(e) {
  let et = e.target,
    word = window.getSelection().toString(),
    parent =
      et.matches(".wrapControl") || et.matches(".clearScreen") || et.matches(".reload")
        ? et
        : getParent(et, ".wrapControl") || getParent(et, ".wrapTextarea");
  let isChild = resultArticleEl.contains(et);
  text = word;
  if (isChild) {
    if (text) {
      speechText(text);
    } else {
      let textWhenClick = e.target.innerText;
      text = textWhenClick;
      speechText(text);
      return;
    }
  } else if (!parent) {
    speechText("No text selected");
  }
  return text;
}

/* 11111111111111111111111111111111111 */
function getVoicesText() {
  voices = window.speechSynthesis.getVoices();
  return voices;
}
function speechText(text) {
  if (text) {
    var voiceGetter = setTimeout(function () {
      voices = getVoicesText();
      if ("speechSynthesis" in window) {
        if (voices || voices.length != 0) {
          var msg = new SpeechSynthesisUtterance(text);
          msg.voice = Mc;
          msg.volume = 1;
          msg.rate = rate.value;
          msg.pitch = 1;
          msg.text = text;
          msg.lang = langs;
          msg.onend = function (e) {
            console.log("Finished in " + e.elapsedTime + " seconds.");
          };
          speechSynthesis.speak(msg);
          setTimeout(voiceGetter);
        }
      } else {
        alert(" Ah man, speech synthesis isnt supported.");
      }
    }, 200);

    var replay = setTimeout(() => {
      var msg = new SpeechSynthesisUtterance(text);
      msg.rate = 0.7;
      msg.pitch = 0.8;
      msg.text = window.getSelection().toString();
      msg.lang = langs;
      speechSynthesis.speak(msg);
      window.clearTimeout(replay);
    }, 800);
  }
}
const clearScreen = select(".clearScreen");
clearScreen.onclick = () => {
  if (resultArticleEl.innerHTML !== "") {
    inputEl.value = "";
    resultArticleEl.innerHTML = inputEl.value;
  }
};

const reloadWeb = select(".revertError");
reloadWeb.onclick = () => {
  speechSynthesis.cancel();
  let reloadStateEl = reloadState();
  if (reloadStateEl) reloadStateEl.click();
};
//]]>

$(window).on("load", function () {
  $(".goog-te-gadget").html($(".goog-te-gadget").children());
  $("#google-translate").fadeIn("1000");

  function cleartimer() {
    setTimeout(function () {
      window.clearInterval(myVar);
    }, 500);
  }
  function myTimer() {
    if ($(".goog-te-combo option:first").length) {
      $(".goog-te-combo option:first").html("Translate");
      cleartimer();
    }
  }
  var myVar = setInterval(function () {
    myTimer();
  }, 0);
});

if (languageBtn) {
  languageBtn.onclick = (e) => {
    voices = getVoicesText();
    handleBtnClick(e, ".contain");
  };
}
function handleBtnClick(e, elem) {
  let et = e.target.matches(elem) ? e.target : getParent(e.target, elem);
  let elementId;
  if (et) elementId = et.id;
  if (elementId) {
    let language;
    switch (elementId) {
      case "England":
        language = "vi|en";
        langs = "en-GB";
        Mc = voices[5];
        break;

      case "Japan":
        language = "vi|ja";
        langs = "ja-JP";
        Mc = voices[13];
        break;

      case "China":
        language = "vi|zh-CN";
        langs = "zh-CN";
        Mc = voices[19];
        break;

      default:
        langs = "en-US";
        Mc = voices[4];
        doGTranslate("vi|en");
        break;
    }
    doGTranslate(language);
  }
}
// Bật đánh dấu văn bản có trong elements
// document.getElementById("element").addEventListener("click", function (event) {
//   setTimeout(
//     function (passedThis) {
//       window.getSelection().selectAllChildren(passedThis);
//     },
//     10,
//     this,
//   );
// });
// Nếu bạn muốn gọi một hàm ngay sau khi chọn văn bản, bạn có thể sử dụng sự kiện "selectionchange":
// document.addEventListener("selectionchange", handleSelection);
// speechSynthesis.speak(new SpeechSynthesisUtterance("Hello World"));
/* ===================================================== */

/* CÁCH THÊM CSS CHO Iframe: */

// var cssLink = document.createElement("link");
// cssLink.href = "style.css";
// cssLink.rel = "stylesheet";
// cssLink.type = "text/css";
// frames["iframe1"].document.head.appendChild(cssLink);

// Chỉ hoạt động với tôi khi tôi đã làm ...document.head.appendChild(cssLink)
