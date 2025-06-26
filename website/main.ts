import { swift2equatable } from "../src";

const input = document.getElementById("input-Text") as HTMLTextAreaElement;
const output = document.getElementById("output-Text") as HTMLTextAreaElement;
const includeComments = document.getElementById("includeComments") as HTMLInputElement;
const useCustomComparison = document.getElementById("useCustomComparison") as HTMLInputElement;

function updateOutput() {
  const inputText = input.value;

  const result = swift2equatable(
    inputText,
    includeComments.checked,
    useCustomComparison.checked
  );

  output.value = result;
}

input.addEventListener("input", updateOutput);
includeComments.addEventListener("change", updateOutput);
useCustomComparison.addEventListener("change", updateOutput);

