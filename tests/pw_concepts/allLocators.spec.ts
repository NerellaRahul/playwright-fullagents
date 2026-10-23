import {test,expect,Locator} from '@playwright/test'

//Todo #Locators are used to identify elements on a web page.
// #  Playwright provides several methods to locate elements, 
// # including by text, role, label, placeholder, title, and test ID.
// #  In this code snippet, we demonstrate how to use these locators in a test function.
// #we can use the Selectors like Xpath and css selectors also but playwright provides
// #  some more locators which are easy to use and understand.
// # Locators mainly known for their ability to identify elements based on their attributes,
// #  text content, or other properties.
// # locator of Playwright is a powerful tool exbits automatic waiting and retrying mechanism,
//Todo#  which makes it more reliable and efficient than traditional selectors.

test('all the Locators', async ({page})=>{

    await page.goto("https://practicesoftwaretesting.com")
    // `````````````````````````````````````````````````````````````````````````````````


    // 1)getByAltText: This locator is used to find an element based on its alt text
    //   attribute.
    const logo: Locator =  page.getByAltText("Banner")
    await expect(logo).toBeVisible()
// ----------------------------------------------------------------------------------------------
    // 2)getByText: This locator is used to find an element based on its text content.
       // text may be a string or a regular expression. 
       // It is case-sensitive by default, 
       // but you can make it case-insensitive by passing the `ignoreCase` option.
        // but here we get strict mode error in 
        // the above example because the text is not unique on the page, 
        // so we can use the first() method to get the first matching element.
       //Todo Non interactive Elements
    const fullString: Locator = page.getByText(" 🐛 Bug Hunting ",{exact: true}) //full string example
    await expect(fullString).toBeVisible()
    await expect(fullString).toHaveText(" 🐛 Bug Hunting ")
    await expect(fullString).toHaveCount(1) //strict mode example
    await expect(fullString).toContainText("Bug")

    // const partialString: Locator = page.getByText("Bug Hunting") //partial string example
    // await expect(partialString).toBeVisible()  
    // const caseInsensitiveString: Locator = page.getByText(/bug hunting/i) //case insensitive example 
    // await expect(caseInsensitiveString).toBeVisible()
// -----------------------------------------------------------------------------------------------
   // 3)getByRole: This locator is used to find an element based on its role attribute.
    //to locate the Role by implict and explict accessbility attribute
    // interationve Elements
   const btn:Locator = page.getByRole("button",{name:' Testing Guide '})
   await expect(btn).toBeVisible()
   await expect(btn).toHaveText(' Testing Guide ')  
// ---------------------------------------------------------------------------------
//4) getByLabel : this is used to ge the Element using the Lable where the placeholeder is misiing
   await page.goto('https://practicetestautomation.com/practice-test-login/')
   await page.getByLabel('username').fill('student')
   await page.getByLabel('password').fill('Password123')
//    await page.getByRole('button',{name: /submit/i}).click()

//---------------------------------------------------------------------------------
//5) get by place holder -> using the Label text we identify the element 
    // form fields with visible labels
    // #   Orange Hrm assignment 
   await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    // #)get by ----label--------------------------------------------------------------
   await  page.getByPlaceholder("Username").fill("Admin") 
   await page.getByPlaceholder("Password").fill("admin123") 
   await page.getByRole("button", {name:"Login"}).click()

//6 get by text 
  await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html')
  const home:Locator = await page.getByTitle("Home page link")
//   await page.waitForTimeout(5000)
  await expect(home).toBeVisible()
  await expect(home).toHaveText('Home')
//7 get by test id 
const profileName:Locator = await page.getByTestId("profile-name")
await expect(profileName).toHaveText("John Doe")

// X-path  is also other way to locate the Elemet 
// two types 1) absolute
//            2) relative 
// absolute has the entire nodes starts qith /
// relative xpath directly jumps in to the Element
//* 
//img[@alt='banner]
await page.locator("//input[@id='username']").fill("pinky")

const textIn:Locator = page.locator("xpath=/html[1]/body[1]/div[3]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/div[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/section[3]/div[1]/input[1]")
await textIn.fill("hai")
await page.waitForTimeout(5000)

// methods of X Path

// contains //*[contains(@class,'btn')]
//                  //*[contains(@id,1)]
// startswith //*[start-with(@class,'btn')]
//                  //*[contains(@id,1)]
// . or text //*[.='pinky']    or //*[text()="rahusl"] ---> excat text
//normalise-space //*[normalise-space()='nerella rahul'] --. ignore space
//

// #same button is acting as two different roles start atop this won't work with xpath/
// test() = 'START' or test() = 'STOP'

// Need to Throgh wi the Axes 


// ----------------------------------------------------------------------------
// CSS  

// 1) relative -css 
// 2) absolute - css


// relative - css
// tag with id ---> tag#id
// tag with class ---> Tag.class
// tag with attribute ---> tag[attribute = value]
// tag with class attribute ---> tag.class[attribute = value]
// tag is optional you can actually remove the tag
// absolute html>body>div>h1

// :nth-child(2)
// para[id=1][class=mmain]
// p[class^=ma] -. start with ma
//p[id$=2] -> end with 
//p :notp[id$=2]
// +p 
// +*
})