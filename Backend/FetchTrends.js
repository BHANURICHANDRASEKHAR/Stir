import express from 'express';
import { Builder, By, until } from "selenium-webdriver";
import { v4 as uuidv4 } from "uuid";
import Trend from "./Database/Schema.js";
import { Options } from "selenium-webdriver/chrome.js";
import dotenv from "dotenv";

dotenv.config();

const router=express.Router();
export default router.post('/',async(req,res)=>{
    const options = new Options();
    options.addArguments("--headless");
    const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

try {
    await driver.get("https://twitter.com/login");

    const username = await driver.wait(
        until.elementLocated(By.xpath("//input[@autocomplete='username']")),
        10000
    );
    await username.sendKeys(process.env.TWITTER_USERNAME);

    const nextButton = await driver.wait(
        until.elementLocated(By.xpath("//span[contains(text(),'Next')]")),
        5000
    );
    await nextButton.click();

    const password = await driver.wait(
        until.elementLocated(By.xpath("//input[@name='password']")),
        10000
    );
    await password.sendKeys(process.env.TWITTER_PASSWORD);

    const loginButton = await driver.wait(
        until.elementLocated(By.xpath("//span[contains(text(),'Log in')]")),
        5000
    );
    await loginButton.click();

    await driver.wait(
        until.elementLocated(By.xpath("//div[@data-testid='trend']")),
        10000
    );

    const trendElements = await driver.findElements(By.xpath("//div[@data-testid='trend']//div[2]"));
    const trendsData = [];
    for (let trendElement of trendElements) {
        const spanText = await trendElement.findElement(By.xpath(".//span")).getText();
        if (spanText.trim() !== "" && !trendsData.includes(spanText)) {
            trendsData.push(spanText.trim());
        }
        if (trendsData.length >= 5) break;
    }

    if (trendsData.length === 0) {
        throw new Error("No trends found");
    }

    const ipAddress = await driver.executeScript("return window.navigator.userAgent;");
    const trendData = new Trend({
        uniqueId: uuidv4(),
        trends: trendsData,
        timestamp: new Date(),
        ipAddress,
    });
    await trendData.save();

    res.status(200).json({ message: "Trends fetched successfully", data: trendData,status:true });
} catch (error) {
    console.error("Error fetching trends:", error.message);
    console.log(error.message)
    res.status(500).json({ error: "Error fetching trends" ,error:error.message,status:false});
} finally {
    await driver.quit();
}
})
