//libs
const fs = require('fs');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const randchars = require("crypto")
const puppeteer = require('puppeteer-extra')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const { uniqueNamesGenerator,  NumberDictionary } = require('unique-names-generator')
const { PuppeteerBlocker } = require('@cliqz/adblocker-puppeteer')
const {fetch} = require('cross-fetch')
const ps = require('prompt-sync')
const prompt = ps();
const colors = require('colors');
const setTitle = require('node-bash-title');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// used this tool when i owned a boost shop. doubt it still fucking works but yall skids can fix this and make ur own shop
// this was a paid tool i think. i didnt buy it myself but enjoy skids.
// discord.gg/extorter

setTitle('Token Gen');


async function main(){
  console.clear()

  'use-scrict';



  console.log(`


                                                     
                  \x1b[31;1m████████╗ ██████╗ ██╗  ██╗███████╗███╗   ██╗     ██████╗ ███████╗███╗   ██╗
                  \x1b[31;1m╚══██╔══╝██╔═══██╗██║ ██╔╝██╔════╝████╗  ██║    ██╔════╝ ██╔════╝████╗  ██║
                  \x1b[31;1m   ██║   ██║   ██║█████╔╝ █████╗  ██╔██╗ ██║    ██║  ███╗█████╗  ██╔██╗ ██║
                  \x1b[31;1m   ██║   ██║   ██║██╔═██╗ ██╔══╝  ██║╚██╗██║    ██║   ██║██╔══╝  ██║╚██╗██║
                  \x1b[31;1m   ██║   ╚██████╔╝██║  ██╗███████╗██║ ╚████║    ╚██████╔╝███████╗██║ ╚████║ 
                  \x1b[31;1m   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝     ╚═════╝ ╚══════╝╚═╝  ╚═══╝
										  
				          
		                             
  

                                               \x1b[31m[\x1b[31m1\x1b[31m] \x1b[37m\x1b[37m\x1b[37mGeneration 
                                               \x1b[31m[\x1b[31m2\x1b[31m] \x1b[37m\x1b[37m\x1b[37mExit
	`);
  let choice = prompt('                                               \x1b[31m\x1b[31m\x1b[31m[ OPTION ] \x1b[37m\x1b[37m\x1b[37m')

  if(choice == 1){
    console.log('')
    console.log('                                               \x1b[31m[\x1b[31m1\x1b[31m] \x1b[37m\x1b[37m\x1b[37mTemp-mail');
    console.log('                                               \x1b[31m[\x1b[31m2\x1b[31m] \x1b[37m\x1b[37m\x1b[37m10minemail');
    console.log('                                               \x1b[31m[\x1b[31m3\x1b[31m] \x1b[37m\x1b[37m\x1b[37mGmails');
    console.log('')
    let emailchoice = prompt('                                               \x1b[31m\x1b[31m\x1b[31m[ OPTION ] \x1b[37m\x1b[37m\x1b[37m');
    let tokensname = prompt('                                               \x1b[31m\x1b[31m\x1b[31m[ CONFIG ] \x1b[37m\x1b[37m\x1b[37mToken Username? ');
    let HowTokens = prompt('                                               \x1b[31m\x1b[31m\x1b[31m[ CONFIG ]\x1b[37m\x1b[37m\x1b[37m How many tokens? ');

    const cfg = {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--window-size=1366,768',
      ],
      defaultViewport: null,
      ignoreHTTPSErrors: true,
      headless: false,
    }

    puppeteer.use(StealthPlugin())
    puppeteer.use(
      RecaptchaPlugin({
        provider: {
          id: 'hcaptcha',
          token: 'token' // change to ur fucking hcaptcha token :3
        },
        visualFeedback: true,
        throwOnError: true
      })
    )

    const accounts = fs.createWriteStream('tokens.txt', {flags:'a'})
    async function dsne(page, infoname, info){
      const p = await page.$('input[name=' + infoname + ']');
      await p.focus();
      await page.keyboard.type(info);
    }

    async function cli(page, name, min, max) {
      var i = await page.$('[class*=input' + name + "]");
      if (i === null) {
        i = await page.$("[class*=" + name + "]");
      }
      await i.click();
      var r = Math.floor(Math.random() * (max - min + 1)) + min;

      await page.waitForSelector('[class*=option]');
      await page.$eval("[class$=option]", function(e, r){e.parentNode.childNodes[r].click()}, r);

      return r
    }

    async function discordInput(dspagee, username, password, email){
      await dspagee.bringToFront();
      await dspagee.goto('https://discord.com/register?redirect_to=%2Flogin', {"waitUntil" : "networkidle0", timeout: 70000});

      await cli(dspagee, "year", 17, 24);
      await cli(dspagee, "day", 0, 28);
      await cli(dspagee, "month", 0, 11);

      dspagee.waitForSelector('input[type*=checkbox]').then(() => {
        dspagee.$eval('input[type*=checkbox]', el => el.click());
      }).catch(e => {});

      await dsne(dspagee, "username", username);
      await dsne(dspagee, "password", password);
      await dsne(dspagee, "email", email);
      await dspagee.$eval('button[type=submit]', (el) => el.click());

    }

    async function captchaby(DiscordPage){
      try {
        await DiscordPage.waitForSelector('[src*=sitekey]');
        await DiscordPage.addScriptTag({content: `hcaptcha.execute()`})
  
        while(true){
          try{
            await DiscordPage.solveRecaptchas();
            return true;
          } catch(err) {
            sleep(3000);
          }
        }
      } catch(e){
      };
    }

    async function genmail(page2){
      if(emailchoice == 1){
        PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
          blocker.enableBlockingInPage(page2);
        });

        await page2.bringToFront();
        await page2.goto("https://temp-mail.org/", { waitUntil: 'networkidle2', timeout: 0});
        var info_id = "#mail";

        try {
          await page2.waitForSelector(info_id);
          await page2.waitForFunction((info_id) => document.querySelector(info_id).value.indexOf("@") != -1, {}, info_id);
          
          var email = await page2.$eval('#mail', el => el.value);
          return email;
        } catch(e){
          return false;
      }}

      else if(emailchoice == 2){
        PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
          blocker.enableBlockingInPage(page2);
        });

        await page2.bringToFront();
        await page2.goto("https://10minemail.com/", { waitUntil: 'networkidle2', timeout: 0});
        var info_id = "#mail";

        try {
          await page2.waitForSelector(info_id);
          await page2.waitForFunction((info_id) => document.querySelector(info_id).value.indexOf("@") != -1, {}, info_id);
          
          var email = await page2.$eval('#mail', el => el.value);
          return email;
        } catch(e){
          return false;
    }}

      else if(emailchoice == 3){
        PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
          blocker.enableBlockingInPage(page2);
        });

        await page2.bringToFront();
        await page2.goto("https://tempmail.dev/en/Gmail", { waitUntil: 'networkidle2', timeout: 0});
        var info_id = "#current-mail";

        try {     
          await page2.waitForSelector('#current-mail');
          const element = await page2.$("#current-mail");
          const email = await page2.evaluate(element => element.textContent, element);
          return email;
        } catch(e){
          return false;
      }
    }
  }

    async function emailvery(page2){
      await page2.bringToFront();
      if(emailchoice == 1){
        while(true){
          try {
            await page2.waitForSelector('[title*=Discord]', {timeout: 500});
            await page2.$eval('[title*=Discord]', e => e.parentNode.click());
          
            await page2.waitForSelector("td > a[href*='discord'][style*=background]");
            const elem = await page2.$eval("td > a[href*='discord'][style*=background]", el => el.href);
          
            return elem;
          } catch(e){};
        }
      }else if(emailchoice == 2){
        while(true){
          try {
            await page2.waitForSelector('[title*=Discord]', {timeout: 500});
            await page2.$eval('[title*=Discord]', e => e.parentNode.click());
          
            await page2.waitForSelector("td > a[href*='discord'][style*=background]");
            const elem = await page2.$eval("td > a[href*='discord'][style*=background]", el => el.href);
          
            return elem;
          } catch(e){};
        }
      }else if(emailchoice == 3){
        while(true){
          try {
            await page2.waitForSelector('#inbox-dataList');
            await page2.click('#inbox-dataList');
          
            await page2.waitForSelector("td > a[href*='discord'][style*=background]");
            const elem = await page2.$eval("td > a[href*='discord'][style*=background]", el => el.href);
          
            return elem;
          } catch(e){};
        }
      }
    }

    async function verif2(chrom, link){
      const page = await chrom.newPage();
      await page.goto(link, {"waitUntil" : "networkidle0", "timeout": 60000});
      captchaby(page);
      await sleep(12000)
      }

    const nickname = [
        `| ${tokensname}`
    ];

    const numberDictionary = NumberDictionary.generate({ min: 1, max: 99999, length: 6, });

    async function create_accinfos(chrome, disc) {
      const username = uniqueNamesGenerator({dictionaries: [numberDictionary, nickname],  separator: ' ', style: "capital",length: 2,});
      const password = randchars.randomBytes(10).toString('hex');
      const page2 = (await chrome.pages())[0];
      var email;

      while(!email){
        try {
          email = await genmail(page2);
        } catch(e){};
      }


      const dspage = disc;
      await discordInput(dspage, username, password, email);

      const client = disc._client;
      var token; // using the variable called token

      client.on('Network.webSocketFrameSent', ({response}) => {
        try {
          const json = JSON.parse(response.payloadData);
          if(!token && json["d"]["token"]){ //.json token passthrough
            token = json["d"]["token"]; //.json token passthrough
          };
        } catch(e){};
      })
      await captchaby(dspage);

      let verifyy = await emailvery(page2);                                       
      console.log('                                               \x1b[31m\x1b[31m\x1b[31m[ PASSED ]')  
      await verif2(chrome, verifyy);
      //Write token to tokensonly.txt
      fs.appendFileSync('tokensonly.txt', `${token}\n`); // saving tokens to the selected .txt

      return `${username}:${email}:${password}:${token}`; // listing tokens as format
    }
    

    (async () => {

      var token; // token .var 

      for (let i = 0; i < HowTokens; i++) {
        const browser = await puppeteer.launch(cfg);
        try {
          const page = await browser.newPage();
          const infos = await create_accinfos(browser, page);
          accounts.write(infos + "\n"); 
        } catch(e) {
          console.log(e);
        } finally {
          try{
            browser.close();
            await sleep(101500)
          } catch(e){};
        }
      }
    })();
  }

  else if(choice == 2){
    await sleep(1000);
  }

  else{
    console.log('                                                \x1b[31m\x1b[31m\x1b[31m[ ERROR ]');  
    sleep(1100)
    main()
  }
}

main()