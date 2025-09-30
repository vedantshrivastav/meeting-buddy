import { Builder, Browser, By, until, WebDriver } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'
import cors from 'cors'
import express from 'express'
import { connectDb } from './db/config'
import User from './db/models/user'
import Meeting from './db/models/meeting'


const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3001


connectDb()
async function openMeet(driver: WebDriver,meet_url : string) {
  
  try {
    await driver.get(meet_url);
    ​​const popupButton = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Got it")]')), 10000);
    await popupButton.click()
    ​​const nameInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Your name"]')), 10000);
    await nameInput.clear();
    await nameInput.click();
    await nameInput.sendKeys('value', "Meeting bot");
    await driver.sleep(1000)
    ​​const buttonInput = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Ask to join")]')), 10000);
    buttonInput.click();    
  } finally {

  }
}

async function getDriver() {
    const options = new Options({})
    options.addArguments("--disable-blink-features=AutomationControlled");
    options.addArguments("--use-fake-ui-for-media-stream");
    options.addArguments("--window-size=1080,720")
    options.addArguments('--auto-select-desktop-capture-source=[RECORD]');
    options.addArguments('--auto-select-desktop-capture-source=[RECORD]');
    options.addArguments('--enable-usermedia-screen-capturing');
    options.addArguments('--auto-select-tab-capture-source-by-title="Meet"')
    options.addArguments('--allow-running-insecure-content');
    
    // ​​--allow-file-access-from-files--use-fake-device-for-media-stream--allow-running-insecure-content--allow-file-access-from-files--use-fake-device-for-media-stream--allow-running-insecure-content


    let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build()
    return driver;
}



async function startScreenshare(driver: WebDriver , meeting_id : string) {
  console.log("this is the meeting id from index",meeting_id)
    console.log("startScreensharecalled")
    const response = await driver.executeScript(`
        const meetingId = arguments[0]
        function wait(delayInMS) {
            return new Promise((resolve) => setTimeout(resolve, delayInMS));
        }

        function startRecording(stream, lengthInMS) {
            let recorder = new MediaRecorder(stream);
            let data = [];
            
            recorder.ondataavailable = (event) => data.push(event.data);
            recorder.start();
            
            let stopped = new Promise((resolve, reject) => {
                recorder.onstop = resolve;
                recorder.onerror = (event) => reject(event.name);
            });
            
            let recorded = wait(lengthInMS).then(() => {
                if (recorder.state === "recording") {
                recorder.stop();
                }
            });
            
            return Promise.all([stopped, recorded]).then(() => data);
        }
      
        console.log("before mediadevices")
        window.navigator.mediaDevices.getDisplayMedia({
            video: {
              displaySurface: "browser"
            },
            audio: true,
            preferCurrentTab: true
        }).then(async screenStream => {                        
            const audioContext = new AudioContext();
            const screenAudioStream = audioContext.createMediaStreamSource(screenStream)
            const audioEl1 = document.querySelectorAll("audio")[0];
            const audioEl2 = document.querySelectorAll("audio")[1];
            const audioEl3 = document.querySelectorAll("audio")[2];
            const audioElStream1 = audioContext.createMediaStreamSource(audioEl1.srcObject)
            const audioElStream2 = audioContext.createMediaStreamSource(audioEl3.srcObject)
            const audioElStream3 = audioContext.createMediaStreamSource(audioEl2.srcObject)

            const dest = audioContext.createMediaStreamDestination();

            screenAudioStream.connect(dest)
            audioElStream1.connect(dest)
            audioElStream2.connect(dest)
            audioElStream3.connect(dest)

            // window.setInterval(() => {
            //   document.querySelectorAll("audio").forEach(audioEl => {
            //     if (!audioEl.getAttribute("added")) {
            //       console.log("adding new audio");
            //       const audioEl = document.querySelector("audio");
            //       const audioElStream = audioContext.createMediaStreamSource(audioEl.srcObject)
            //       audioEl.setAttribute("added", true);
            //       audioElStream.connect(dest)
            //     }
            //   })

            // }, 2500);
          
          // Combine screen and audio streams
          const combinedStream = new MediaStream([
              ...screenStream.getVideoTracks(),
              ...dest.stream.getAudioTracks()
          ]);
          
          console.log("before start recording")
          const recordedChunks = await startRecording(combinedStream, 60000);
          console.log("after start recording")
          
          let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
          async function sendRecording(recordedBlob,meetingId){
    const arrayBuffer = await recordedBlob.arrayBuffer()
    //send to node server
    await fetch('http://localhost:3000/upload',{
        method : "POST",
        headers : {
            "Content-Type" : "application/octet-stream",
            "x-meeting-id" :  meetingId
        },
        body : arrayBuffer
    })
}
          await sendRecording(recordedBlob,meetingId)
          console.log('recording sent')
          // Create download for video with audio
        //   const recording = document.createElement("video");
        //   recording.src = URL.createObjectURL(recordedBlob);
          
        //   const downloadButton = document.createElement("a");
        //   downloadButton.href = recording.src;
        //   downloadButton.download = "RecordedScreenWithAudio.webm";    
        //   downloadButton.click();
          
        //   console.log("after download button click")
          // Clean up streams
          screenStream.getTracks().forEach(track => track.stop());
        //   audioStream.getTracks().forEach(track => track.stop());
        })
        
    `,meeting_id)

    console.log(response)
    driver.sleep(1000000)
}

async function main(meet_url : string , meeting_id : string) {
    
    const driver = await getDriver();
    await openMeet(driver,meet_url);
    await new Promise(x => setTimeout(x, 20000));
    // wait until admin lets u join
    await startScreenshare(driver,meeting_id);    
}
app.post('/register-user',async (req,res) => {
  const {clerkId,email} = req.body
  try{
    //check if the user exists
    const existing_user = await User.findOne({clerkId})
    if(existing_user) {
      res.json({
        data : existing_user,
        message : "User already exists"
      })
    }
    // create a new user
    const new_user = await User.create({
      clerkId,
      email
    })
    res.json({
      data : new_user,
      message : "New user created"
    })
  }
  catch(e){
     console.error(e)
     res.status(500).json({message : "Server Error"})
  }
})
app.post('/start-bot', async (req, res) => {
  console.log('inside the start bot');
  const { meetUrl, userId } = req.body;
  let user = await User.findOne({clerkId : userId})
  try {
    const meeting = await Meeting.create({
      userId : user?._id,
      meetId: meetUrl,
      status: "pending",
    });

    const meeting_id = String(meeting._id);

    // Send response immediately
    res.json({ id: meeting_id, data: meeting, message: "Meeting registered and bot starting..." });

    // Start bot asynchronously
    main(meetUrl, meeting_id)
      .then(async () => {
        console.log("Bot started and recording process initiated");
        await Meeting.findOneAndUpdate(
          { meetId: meetUrl, status: "pending" },
          { status: "in-progress" },
          { new: true }
        );
      })
      .catch(async (err) => {
        console.error("Some error occurred", err);
        await Meeting.findOneAndUpdate(
          { meetId: meetUrl },
          { status: "failed" }
        );
      });

  } catch (e) {
    console.error("Error occurred while starting bot", e);
    res.status(500).json({ message: "Server error from bot" });
  }
});

app.listen(PORT,() => {
   console.log(`server is running on ${PORT}`)
})