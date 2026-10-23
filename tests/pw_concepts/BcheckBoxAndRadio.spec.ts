import {test,expect,Locator} from '@playwright/test'

test('text input actions',async ({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/")
// #text box 
const name:Locator = page.locator('#name')
await expect(name).toBeVisible()
await expect(name).toBeEnabled()
const maxLength: string | null = await name.getAttribute('maxlength')
const maxLength2: any= await name.getAttribute('maxlength')
expect(maxLength).toBe('15')
await name.fill('pinky Lips')
expect(await name.inputValue()).toBe('pinky Lips')
})


// #check box actions 
test('Verify the single checkbox',async ({page})=>{
   await page.goto("https://testautomationpractice.blogspot.com/")
   const sundayCheckBox:Locator =  page.locator('input.form-check-input#sunday')
   await sundayCheckBox.check()
   if(await sundayCheckBox.isChecked())
   {
   expect( page.locator('input.form-check-input#sunday')).toBeChecked()
   expect(await page.locator('input.form-check-input#sunday').isChecked()).toBeTruthy();
   expect(await page.locator('input.form-check-input#wednesday').isChecked()).toBeFalsy();
   }
   else 
   {
    console.log("checkbox is not checked")
   }
})

test('verify the multiple checkboxes',async ({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/")
await page.locator('input.form-check-input#sunday').check()
await page.locator('input.form-check-input#monday').check()
await page.waitForTimeout(2000)
// todo #must know Error
    // const checkBoxes: Locator = page.locator("input.form-check-input[type='checkbox']")
    // Type 'Locator' must have a '[Symbol.iterator]()' method that returns an iterator.
    // for(const loc of checkBoxes)
    // {

    // }
//todo converted to array can use any row 
const checkBoxes: Locator[] = await page.locator("input.form-check-input[type='checkbox']").all()
// #check the check box

for(const loc of checkBoxes)
{
   if(await loc.isChecked()) 
   {
    console.log(`already checked ${loc}`)
   }
   else
   {
    await loc.check()
   }
}

await page.waitForTimeout(5000)

// uncheck the chekbox
for(const loc of checkBoxes)
{
   if(await loc.isChecked()) 
   {
      await loc.uncheck()
   }
   else
   {
   await loc.check()
   }
}

})


test("radio test",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")
   const radio:Locator =  page.locator(".form-check-input[name='gender'][value='male']")
   const radio2:Locator =  page.locator(".form-check-input[name='gender'][value='female']")
   await radio.check()
   if(await radio.isChecked())
   {
      expect(radio).toBeChecked()
      expect(radio2).not.toBeChecked()
   }
   await radio2.check()
    if(await radio2.isChecked())
   {
      expect(radio2).toBeChecked()
      expect(radio).not.toBeChecked()
   }
   expect(radio).not.toBeChecked()
})

// todo ----> this the Short notes for the Check boxes 

// <form>
//   <p>Select your available weekdays:</p>

//   <label><input type="checkbox" id="monday" name="weekdays" value="Monday"> Monday</label>
//   <label><input type="checkbox" id="tuesday" name="weekdays" value="Tuesday"> Tuesday</label>
//   <label><input type="checkbox" id="wednesday" name="weekdays" value="Wednesday"> Wednesday</label>
//   <label><input type="checkbox" id="thursday" name="weekdays" value="Thursday"> Thursday</label>
//   <label><input type="checkbox" id="friday" name="weekdays" value="Friday"> Friday</label>
//   <label><input type="checkbox" id="saturday" name="weekdays" value="Saturday"> Saturday</label>
//   <label><input type="checkbox" id="sunday" name="weekdays" value="Sunday"> Sunday</label>
// </form>





// Locator	getByRole()
// 	Locate a checkbox by its accessible name
//     	page.getByRole('checkbox', { name: 'Monday' })
// Locator	locator()	
//     Locate checkboxes using CSS
//     	page.locator('input[name="weekdays"]')

// Action	check()
// 	Select a weekday checkbox	
//        await page.getByRole('checkbox', { name: 'Monday' }).check()
// Action	uncheck()	
//     Deselect a weekday checkbox	
//       await page.getByRole('checkbox', { name: 'Monday' }).uncheck()
// Action	setChecked(true)	
//     Set a weekday checkbox to selected	
//       await page.getByRole('checkbox', { name: 'Tuesday' }).setChecked(true)
// Action	setChecked(false)	
//     Set a weekday checkbox to unselected	
//       await page.getByRole('checkbox', { name: 'Tuesday' }).setChecked(false)
// Action	click()	
//     Click and toggle a weekday checkbox	
//       await page.getByRole('checkbox', { name: 'Wednesday' }).click()
// Action	focus()
// 	Focus a weekday checkbox	
//       await page.getByRole('checkbox', { name: 'Thursday' }).focus()
// Action	press()
// 	Toggle a focused checkbox using Space	
//       await page.getByRole('checkbox', { name: 'Friday' }).press('Space')
// Query	isChecked()	
//     Retrieve the current checked state
//     	const selected = await page.getByRole('checkbox', { name: 'Monday' }).isChecked()
// Validation	isVisible()
// 	Check whether a weekday checkbox is visible
//     	const visible = await page.getByRole('checkbox', { name: 'Monday' }).isVisible()
// Validation	isEnabled()
// 	Check whether a checkbox is enabled	
//        const enabled = await page.getByRole('checkbox', { name: 'Monday' }).isEnabled()
// Validation	isDisabled()
// 	Check whether a checkbox is disabled
//     	const disabled = await page.getByRole('checkbox', { name: 'Monday' }).isDisabled()
// Validation	isEditable()
// 	Check editability; generally not meaningful for checkboxes
//     	const editable = await page.getByRole('checkbox', { name: 'Monday' }).isEditable()
// Assertion	toBeChecked()
// 	Assert that Monday is selected
//     	await expect(page.getByRole('checkbox', { name: 'Monday' })).toBeChecked()
// Assertion	not.toBeChecked()
// 	Assert that Sunday is not selected
//     	await expect(page.getByRole('checkbox', { name: 'Sunday' })).not.toBeChecked()
// Assertion	toBeVisible()
// 	Assert that Monday is visible
//     	await expect(page.getByRole('checkbox', { name: 'Monday' })).toBeVisible()
// Assertion	toBeHidden()
// 	Assert that a checkbox is hidden
//     	await expect(page.getByRole('checkbox', { name: 'Monday' })).toBeHidden()
// Assertion	toBeEnabled()
// 	Assert that Monday is enabled
//     	await expect(page.getByRole('checkbox', { name: 'Monday' })).toBeEnabled()
// Assertion	toBeDisabled()
// 	Assert that a checkbox is disabled
//     	await expect(page.getByRole('checkbox', { name: 'Monday' })).toBeDisabled()
// Assertion	toHaveCount()
// 	Assert that seven weekday checkboxes exist
//     	await expect(page.locator('input[name="weekdays"]')).toHaveCount(7)
// Assertion	toHaveAttribute()
// 	Assert the checkbox value attribute
//     	await expect(page.getByRole('checkbox', { name: 'Monday' })).toHaveAttribute('value', 'Monday')
// Assertion	toHaveClass()
// 	Assert a checkbox's CSS class
//     	await expect(page.getByRole('checkbox', { name: 'Monday' })).toHaveClass('selected')
// Assertion	toHaveCSS()
// 	Assert a checkbox's CSS property
//     	await expect(page.getByRole('checkbox', { name: 'Monday' })).toHaveCSS('color', 'rgb(0, 0, 0)')


// //todo --> this is the Short notes for the raadio 

// # Playwright Radio Button Methods — TypeScript

// Based on the official Playwright documentation, radio buttons use the `radio` role with `getByRole()`. You can select a radio button using `check()` or `setChecked(true)` and verify its state using `isChecked()` or `expect().toBeChecked()`.&#x20;

// [image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

// GitHub

// +2



// ## 1. Locators

// Locator `getByRole()` Locate a radio button by its accessible name.

// ```
// page.getByRole('radio', { name: 'Male' })
// ```

// Locator `locator()` Locate radio buttons using CSS.

// ```
// page.locator('input[name="gender"]')
// ```

// Locator `getByLabel()` Locate a radio button using its associated label.

// ```
// page.getByLabel('Female')
// ```

// Example HTML for these notes:

// ```
// <form>
//   <label>
//     <input type="radio" name="gender" value="male" />
//     Male
//   </label>

//   <label>
//     <input type="radio" name="gender" value="female" />
//     Female
//   </label>

//   <label>
//     <input type="radio" name="gender" value="other" />
//     Other
//   </label>
// </form>
// ```

// ## 2. Actions

// Action `check()` Select the Male radio button.

// ```
// await page.getByRole('radio', { name: 'Male' }).check()
// ```

// Action `setChecked(true)` Set the Female radio button to selected.

// ```
// await page.getByRole('radio', { name: 'Female' }).setChecked(true)
// ```

// Action `click()` Click and select the Other radio button.

// ```
// await page.getByRole('radio', { name: 'Other' }).click()
// ```

// Action `focus()` Focus the Male radio button.

// ```
// await page.getByRole('radio', { name: 'Male' }).focus()
// ```

// Action `press()` Select a focused radio button using the Space key.

// ```
// await page.getByRole('radio', { name: 'Female' }).focus()
// await page.getByRole('radio', { name: 'Female' }).press('Space')
// ```

// Official API reference: [Locator methods](https://playwright.dev/docs/api/class-locator?utm_source=chatgpt.com) · [Input actions](https://playwright.dev/docs/input?utm_source=chatgpt.com)

// Important: Unlike checkboxes, radio buttons in the same group cannot normally be individually unchecked. Selecting another radio button in the same group deselects the previously selected option. Playwright documents `check()` and `setChecked()` for radio inputs.&#x20;

// [image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

// GitHub

// +1



// ## 3. Query

// Query `isChecked()` Retrieve the current selection state of the Male radio button.

// ```
// const selected = await page.getByRole('radio', { name: 'Male' }).isChecked()
// ```

// ## 4. Validations

// Validation `isVisible()` Check whether the Male radio button is visible.

// ```
// const visible = await page.getByRole('radio', { name: 'Male' }).isVisible()
// ```

// Validation `isEnabled()` Check whether the Male radio button is enabled.

// ```
// const enabled = await page.getByRole('radio', { name: 'Male' }).isEnabled()
// ```

// Validation `isDisabled()` Check whether the Male radio button is disabled.

// ```
// const disabled = await page.getByRole('radio', { name: 'Male' }).isDisabled()
// ```

// Validation `isEditable()` Not applicable to radio buttons; this method throws for a standard radio input because radio buttons are not editable fields.

// ## 5. Assertions

// Assertion `toBeChecked()` Assert that the Male radio button is selected.

// ```
// await expect(page.getByRole('radio', { name: 'Male' })).toBeChecked()
// ```

// Assertion `not.toBeChecked()` Assert that the Female radio button is not selected.

// ```
// await expect(page.getByRole('radio', { name: 'Female' })).not.toBeChecked()
// ```

// Assertion `toBeVisible()` Assert that the Male radio button is visible.

// ```
// await expect(page.getByRole('radio', { name: 'Male' })).toBeVisible()
// ```

// Assertion `toBeHidden()` Assert that the Male radio button is hidden.

// ```
// await expect(page.getByRole('radio', { name: 'Male' })).toBeHidden()
// ```

// Assertion `toBeEnabled()` Assert that the Male radio button is enabled.

// ```
// await expect(page.getByRole('radio', { name: 'Male' })).toBeEnabled()
// ```

// Assertion `toBeDisabled()` Assert that the Other radio button is disabled.

// ```
// await expect(page.getByRole('radio', { name: 'Other' })).toBeDisabled()
// ```

// Assertion `toHaveCount()` Assert that three gender radio buttons exist.

// ```
// await expect(page.locator('input[name="gender"]')).toHaveCount(3)
// ```

// Assertion `toHaveAttribute()` Assert the value attribute of the Male radio button.

// ```
// await expect(page.getByRole('radio', { name: 'Male' })).toHaveAttribute('value', 'male')
// ```

// Assertion `toHaveClass()` Assert the CSS class of the Male radio button.

// ```
// await expect(page.getByRole('radio', { name: 'Male' })).toHaveClass('selected')
// ```

// Assertion `toHaveCSS()` Assert the radio button's CSS color property.

// ```
// await expect(page.getByRole('radio', { name: 'Male' })).toHaveCSS('color', 'rgb(0, 0, 0)')
// ```

// Assertion `toHaveValue()` Assert the value of the Male radio button.

// ```
// await expect(page.getByRole('radio', { name: 'Male' })).toHaveValue('male')
// ```

// Official reference: [Playwright test assertions](https://playwright.dev/docs/test-assertions?utm_source=chatgpt.com) · [Locator assertions API](https://playwright.dev/docs/api/class-locatorassertions?utm_source=chatgpt.com).&#x20;

// [image](https://www.google.com/s2/favicons?domain=https://playwright.dev\&sz=32)

// Playwright

// +1



// Note: The examples assume the HTML labels and attributes shown above. CSS classes and computed styles such as `selected` and `color` must match your actual application; they are not default radio-button values.