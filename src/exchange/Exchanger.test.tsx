import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import { AppState, initialState } from "../AppContext";
import { Account } from "./Account";
import { Exchanger } from "./Exchanger";

describe("Exchanger", () => {
  function mockAppContext(state: Partial<AppState> = {}) {
    const dispatch = jest.fn();
    jest.spyOn(React, "useContext").mockReturnValue({
      state: { ...initialState(), ...state, baseAmount: "100" },
      dispatch,
    });

    return { dispatch };
  }

  let wrapper;
  let dispatch;
  beforeEach(() => {
    jest.restoreAllMocks();
    dispatch = mockAppContext().dispatch;

    wrapper = shallow(<Exchanger />);
  });

  it("renders correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("dispatches BASE_AMOUNT_CHANGED", async () => {
    wrapper.find(Account).at(0).props().onAmountChange("foo");

    expect(dispatch).toBeCalledWith({
      type: "BASE_AMOUNT_CHANGED",
      payload: {
        amount: "foo",
      },
    });
  });

  it("dispatches EXCHANGE_REQUEST", async () => {
    wrapper.find("Button").at(0).props().onClick!();

    expect(dispatch).toBeCalledWith({
      type: "EXCHANGE_REQUEST",
      payload: {},
    });
  });
});
