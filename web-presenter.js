(() => {
  let floating=null,placeholder=null,restoring=false;
  const originalDocument=document;
  function restore(){
    if(restoring)return;
    restoring=true;
    const root=floating?.document.getElementById('root');
    if(root&&placeholder?.parentNode)placeholder.before(root);
    placeholder?.remove();placeholder=null;
    originalDocument.body.classList.remove('web-floating-active');
    window.__interactFloatingWindow=null;
    floating=null;restoring=false;
    window.dispatchEvent(new Event('interact:floating-change'));
  }
  window.__interactCloseFloating=()=>{
    const target=floating;
    restore();
    if(target&&!target.closed)target.close();
  };
  window.__interactOpenFloating=async()=>{
    if(floating&&!floating.closed){floating.focus();return;}
    const root=originalDocument.getElementById('root');
    if(!root||!/^#\/presenter\/(?!new(?:$|[?]))[^/?]+/.test(location.hash))throw new Error('請先進入場次再開啟浮動教學視窗。');
    let target;
    if(window.documentPictureInPicture?.requestWindow){
      target=await window.documentPictureInPicture.requestWindow({width:420,height:720});
    } else {
      target=window.open('about:blank','interact-teaching','popup,width=420,height=720,resizable=yes,scrollbars=yes');
      if(!target)throw new Error('小視窗被瀏覽器阻擋，請允許此網站開啟彈出式視窗。');
    }
    try {
      target.document.title='InterAct 浮動教學';
      target.document.documentElement.lang='zh-Hant';
      target.document.documentElement.classList.add('web-pip');
      const base=target.document.createElement('base');base.href=originalDocument.baseURI;target.document.head.append(base);
      for(const source of originalDocument.querySelectorAll('link[rel="stylesheet"],style')){
        const clone=source.cloneNode(true);
        if(source.tagName==='LINK')clone.href=source.href;
        target.document.head.append(clone);
      }
      floating=target;window.__interactFloatingWindow=target;
      placeholder=originalDocument.createElement('section');
      placeholder.className='web-floating-placeholder';
      const title=originalDocument.createElement('h1');title.textContent='浮動教學視窗已開啟';
      const text=originalDocument.createElement('p');text.textContent='QR Code 與控制台已移至小視窗。現在可手動最小化此主視窗，或切換到教材。請保留此分頁。';
      const hint=originalDocument.createElement('p');hint.textContent=window.documentPictureInPicture?'小視窗由瀏覽器置頂；彈幕會在小視窗內播放。':'此瀏覽器使用一般小視窗，不保證置頂；可改用支援文件子母畫面的瀏覽器。';
      const back=originalDocument.createElement('button');back.type='button';back.textContent='返回完整教學頁';back.onclick=window.__interactCloseFloating;
      placeholder.append(title,text,hint,back);root.before(placeholder);
      target.document.body.append(root);
      originalDocument.body.classList.add('web-floating-active');
      target.addEventListener('pagehide',restore,{once:true});
      window.dispatchEvent(new Event('interact:floating-change'));
    } catch(error){if(floating)restore();target.close();throw error;}
  };
  window.addEventListener('hashchange',()=>{
    if(floating&&!/^#\/presenter\/(?!new(?:$|[?]))[^/?]+/.test(location.hash))window.__interactCloseFloating();
  });
  window.addEventListener('pagehide',()=>{if(floating)window.__interactCloseFloating();});
})();
