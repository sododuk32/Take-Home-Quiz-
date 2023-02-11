import React, { useState } from "react";
import styled from "styled-components";
import { convertionApi } from "../lib/axios";
const Exc = styled.section`
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .firstPannel,
  .secondPannel {
    border-radius: 30px;
  }
  .secondPannel {
    margin-top: 1vw;
  }
`;
function Exchange() {
  const contry = [
    { name: "캐나다 달러", currency: "CAD" },
    { name: "한국 원", currency: "KRW" },
    { name: "미국 달러", currency: "USD" },
    { name: "유럽 유로화", currency: "EUR" },
    { name: "일본 엔화", currency: "JSY" },
  ];

  const [output1, setoutputs1] = useState({ currency: "CAD" });
  const [output2, setoutputs2] = useState({ currency: "KRW" });

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const inputValue = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const nowTarget = e.target;
    let carc: string;
    if (nowTarget.tagName === "INPUT") {
      const nowString = e.currentTarget.value;
      if (nowString.includes("e") || nowString.includes("E")) {
        e.currentTarget.value = nowString.replace("e", "");
      }
      if (nowTarget.id.includes("1")) {
        setoutputs2({ currency: output2.currency });
        setInputValue1(nowString);
        await convertionApi({
          from: { currency: output1.currency },
          to: { currency: output2.currency },
        }).then((res) => {
          carc = res.data.result;
          const results = String(
            Math.round(Number(nowTarget.value) * Number(carc))
          );
          setInputValue2(results);
        });
      }
      if (nowTarget.id.includes("2")) {
        setoutputs1({ currency: output1.currency });
        setInputValue2(nowString);
        await convertionApi({
          from: { currency: output2.currency },
          to: { currency: output1.currency },
        }).then((res) => {
          carc = res.data.result;
          const results = String(
            Math.round(Number(nowTarget.value) * Number(carc))
          );
          setInputValue1(results);
        });
      }
    }
    if (nowTarget.tagName === "SELECT") {
      if (nowTarget.id.includes("1")) {
        setoutputs1({ currency: nowTarget.value });
        await convertionApi({
          from: { currency: output1.currency },
          to: { currency: output2.currency },
        }).then((res) => {
          carc = res.data.result;
          const results = String(
            Math.round(Number(nowTarget.value) * Number(carc))
          );
          setInputValue2(results);
        });
      }
      if (nowTarget.id.includes("2")) {
        setoutputs2({ currency: nowTarget.value });
        await convertionApi({
          from: { currency: output2.currency },
          to: { currency: output1.currency },
        }).then((res) => {
          carc = res.data.result;
          const results = String(
            Math.round(Number(nowTarget.value) * Number(carc))
          );
          setInputValue1(results);
        });
      }
    }
    // 받은거 그대로 넘겨줘서 api호출 => then res을 setInputValue
  };
  return (
    <Exc>
      <div className="firstPannel">
        <input
          id="input1"
          value={inputValue1}
          type="number"
          placeholder="숫자를 입력해주세요"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputValue(e)}
        />
        <select id="select1" defaultValue="CAD" onChange={(e) => inputValue(e)}>
          {contry.map((e) => (
            <option key={e.currency} value={e.currency}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
      <div className="secondPannel">
        <input
          id="input2"
          type="number"
          value={inputValue2}
          placeholder="숫자를 입력해주세요"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputValue(e)}
        />
        <select id="select2" defaultValue="KRW" onChange={(e) => inputValue(e)}>
          {contry.map((e) => (
            <option key={e.currency} value={e.currency}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
    </Exc>
  );
}

export default Exchange;
