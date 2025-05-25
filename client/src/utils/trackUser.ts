let startTime= Date.now();
let maxScroll = 0;
let clickEvents : String[] = [];
let intervalId: NodeJS.Timeout | null = null;

let totalTime=0;

export function trackUser(sessionId:string, page:string){
  startTime=Date.now();
  maxScroll=0;
  clickEvents=[]
  totalTime=0;
  document.addEventListener('click',function(e:MouseEvent){
    const target = e.target as HTMLElement;
    if(!target) return;

  const tag = target.tagName;
    const text= target.innerText?.slice(0,50);
    clickEvents.push(`Click: <${tag}> ${text}`);
  });

  document.addEventListener('scroll',function(){
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.body.scrollHeight;
    const per = (scrolled/total) * 100;
    maxScroll = Math.max(maxScroll,Math.floor(per));
  })

 intervalId = setInterval(() => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    totalTime=timeSpent;
    const payload = {
      sessionId,
      page,
      timeSpent:totalTime,
      scrollDepth: maxScroll,
      clicks: [...clickEvents]
    };

    startTime = Date.now();
    clickEvents = [];
    maxScroll = 0;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/usertrack`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(()=>{console.log('Data send')}).catch(err => {
      console.error('Tracking error:', err);
    });
  }, 30000);
}

export function stopUserTracking() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
