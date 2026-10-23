 import {test,expect,Locator} from '@playwright/test'

test.skip("static single select Handle dropdowns",async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator("#country").selectOption(['red','France','Japan']);
    await page.waitForTimeout(2000);
    // const optns =  page.locator('#country option')
    //Multiple ways to select option from the dropdown
    //await page.locator("#country").selectOption({label:'India'});  //label/ visible text
    //await page.locator("#country").selectOption('India');  //visible text
     //await page.locator("#country").selectOption({value: 'uk'}); // by using value
     //await page.locator("#country").selectOption({index: 1});  // by using index
     //await page.selectOption("#country",'India'); //by text

    //Assertions
    //1) check number of options in dropdown - Approach1
    //const options=await page.locator('#country option')
    //await expect(options).toHaveCount(10);

    //2) check number of options in dropdown - Appraoch2
    //const options=await page.$$('#country option')
    //console.log("Number of options:", options.length)
    // await expect(options.length).toBe(10);

    //3) check presence of value in the dropdown - Appraoch1
    // const content: string | null =await page.locator('#country').textContent()
    // expect(content?.includes('India')).toBeTruthy();

    //4) check presence of value in the dropdown - Approach 2 - using looping
    /*const options=await page.$$('#country option')
    let status=false;
    for(const option of options)
    {
        //console.log(await option.textContent())
        let value=await option.textContent();
        if(value.includes('France'))
        {
        status=true;
        break;
        }
    }
    expect(status).toBeTruthy();
    */


  //5) select option from dropdown using loop 
//   const options=await page.$$('#country option')
//   //   console.log(options)
//   for(const option of options)
//   {
//     let value: string | null = await option.textContent();
//     if(value?.includes('France'))
//     {
//       await page.selectOption("#country", value);
//       break;
//     }
//   }

// 
     

})

 test.skip("multi select dropdown without using the selectoption",async ({page}) =>{
 await page.goto("https://testautomationpractice.blogspot.com/")
 const colors =   page.locator('#colors')
 await colors.selectOption(['red','blue','green'])

 await page.waitForTimeout(3000)


 } )

 test.skip("dynamic or autosuggest dropdown without using the selectoption",async ({page}) =>{

//   Todo The options are keep changing dynamically options option can't capture dynamically 

/* 
todo Dynamic, Bootstrap, Autosuggest drop down we can't capture the options Directly 
todo 2 Options are not visible in the Dom 
todo3 #

*/


//  todo Auto suggest Drop Down 

// todo    Here the Options are changed with  same order changes with the input keys 

  test.setTimeout(80000);
 await page.goto("https://www.flipkart.com/")

await page.locator("input[name='q']").first().fill('smart');
await page.waitForTimeout(5000)
const options:Locator = await page.locator('ul>li')
const count: any = await options.count()
var innerText:string;
    for(let i=0; i < count; i++)
    {
       innerText= await options.nth(i).innerText()
       console.log(innerText)
    

    // todo <span> abc </span>
    /*

    todo --> inner text   textContent both we can use  in the above 
     */
    //todo  <span label = abc > name </span>
    // todo  for the above tag innerText(): is name   , textContent():label = abc  is 
    // todo innerText maninly used for the input boxes 
    //todo Text
    await page.waitForTimeout(5000);

    if (innerText.trim() === 'smart Phone')
    {
         options.nth(i).click()
         page.waitForTimeout(2000)
         break;
    } 
}

 } )



test.only('Boostrap dropdown', async ({page}) =>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // demo for the bootstrap drop down
   await page.getByPlaceholder('Username').fill('Admin')
   await page.getByPlaceholder('Password').fill('admin123')
   await page.locator("button[type='submit']").click();
//    const text:String = await page.getByText('Dashboard').innerText()
//    expect(text).toBe("Dashboard")
   await page.getByText('PIM').click()
   await page.getByText('-- Select --').nth(1).click()
    const options = await page.locator("div[role='listbox'] span").all();
   for (let option of  options)
   {
    console.log(option.textContent());
   }
    // await page.locator('.multiselect').click() // click on the dropdown
    
    //1
    //const options=await page.locator('ul>li label input')
    //await expect(options).toHaveCount(11);

    //2
    //const options=await page.$$('ul>li label input')
    //await expect(options.length).toBe(11)

    //3 select options from dropdown
    /*const options=await page.$$('ul>li label')
    for(let option of options)
    {
        const value=await option.textContent();
        //console.log("value is",value)
        if(value.includes('Angular') || value.includes('Java'))
        {
            await option.click()
        }

    }*/

    // delect options
    // const options=await page.$$('ul>li label')
    // for(let option of options)
    // {
    //     const value=await option.textContent();
    //     //console.log("value is",value)
    //     if(value.includes('HTML') || value.includes('CSS'))
    //     {
    //         await option.click()
    //     }

    // }


    // await page.waitForTimeout(5000);
})