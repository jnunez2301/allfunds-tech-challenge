import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "../components/Button";
import { apiURL } from "../utils/utils";

describe("Button component", () => {
  afterEach(cleanup);
  it("should render text", () => {
    const btnText = "Click Me!";
    render(<Button>{btnText}</Button>);
    const renderedBtnText = screen.getByText(btnText).innerHTML;
    expect(renderedBtnText).toBe(btnText);
  });
});
// Make sure backend is running
describe("fetch favorite data", () => {
  it("should fetch favorite data", async () => {
    const response = await fetch(`${apiURL}/grocery?favorite=1`);
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      expect(data[i].favorite).toBe("1" || 1);
    }
  });
});
describe('fetch all data', () =>{
  it('should fetch all data', async () =>{
    const response = await fetch(`${apiURL}/grocery`);
    const data = await response.json();
    expect(data.length).toBeGreaterThan(0);
  })
  it('stock should be equal or greater than 0', async () =>{
    const response = await fetch(`${apiURL}/grocery`);
    const data = await response.json();
    for(let i = 0; i < data.length; i++){
      expect(data[i].stock).toBeGreaterThanOrEqual(0);
    }
  })
})
describe('patch favorite data', () =>{
  it('should patch favorite data', async () =>{
    const response = await fetch(`${apiURL}/grocery/1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({favorite: 1})
    });
    const data = await response.json();
    expect(data.favorite).toBe('1');
  })
})