/**
 * AutomataTutor AI Frontend Application Logic
 * Milestone 2 Implementation - Team CodeCrafters
 */

const PRESETS = {
  even0s: "Construct a DFA over alphabet {0,1} that accepts all strings containing an even number of 0s.",
  cfgGnf: "Convert the following Context-Free Grammar to Greibach Normal Form (GNF): S -> AA | a, A -> SS | b.",
  hpProof: "Prove that the Halting Problem (H_TM) is undecidable using a reduction proof.",
  invalidInput: "idk solve this thing for me fast"
};

const MOCK_RESPONSES = {
  v3: {
    even0s: `
<div class="space-y-4">
  <div class="bg-indigo-950/40 border border-indigo-800/50 p-4 rounded-xl">
    <h3 class="text-indigo-300 font-bold mb-1"><i class="fa-solid fa-lightbulb mr-2"></i>1. Core Logic & Intuition</h3>
    <p class="text-slate-300 text-sm">We need to track the parity of '0's read in the input string. Since parity is binary (even or odd), exactly 2 states are required. Reading a '1' does not change the count of '0's, so the machine stays in its current state.</p>
  </div>

  <div class="bg-slate-900 p-4 rounded-xl border border-slate-700/80">
    <h3 class="text-purple-300 font-bold mb-2"><i class="fa-solid fa-diagram-project mr-2"></i>2. Formal 5-Tuple Definition</h3>
    <p class="font-mono text-xs text-slate-300 mb-2">M = (Q, Σ, δ, q0, F)</p>
    <ul class="list-disc list-inside space-y-1 text-xs text-slate-300 font-mono">
      <li>Q = { q0 (Even 0s), q1 (Odd 0s) }</li>
      <li>Σ = { 0, 1 }</li>
      <li>q0 = Initial State</li>
      <li>F = { q0 } (Since 0 is an even count)</li>
    </ul>
    
    <div class="mt-3 overflow-x-auto">
      <table class="w-full text-xs text-left text-slate-300 border border-slate-700">
        <thead class="bg-slate-800 text-slate-200">
          <tr><th class="p-2 border border-slate-700">State</th><th class="p-2 border border-slate-700">Input '0'</th><th class="p-2 border border-slate-700">Input '1'</th></tr>
        </thead>
        <tbody>
          <tr><td class="p-2 border border-slate-700 font-semibold text-emerald-400">→ *q0 (Accept)</td><td class="p-2 border border-slate-700">q1</td><td class="p-2 border border-slate-700">q0</td></tr>
          <tr><td class="p-2 border border-slate-700">q1</td><td class="p-2 border border-slate-700">q0</td><td class="p-2 border border-slate-700">q1</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="bg-slate-900 p-4 rounded-xl border border-slate-700/80">
    <h3 class="text-emerald-300 font-bold mb-2"><i class="fa-solid fa-vial mr-2"></i>3. Edge-Case & Trace Validation</h3>
    <div class="space-y-1 text-xs">
      <div class="flex justify-between bg-slate-950 p-2 rounded"><span class="font-mono">ε (Empty String)</span> <span class="text-emerald-400 font-bold">PASS (Ends at q0 -> ACCEPT)</span></div>
      <div class="flex justify-between bg-slate-950 p-2 rounded"><span class="font-mono">"0" (Single 0)</span> <span class="text-rose-400 font-bold">REJECT (Ends at q1)</span></div>
      <div class="flex justify-between bg-slate-950 p-2 rounded"><span class="font-mono">"010" (Two 0s)</span> <span class="text-emerald-400 font-bold">PASS (q0->q1->q1->q0 -> ACCEPT)</span></div>
    </div>
  </div>

  <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-400">
    <strong>Verification Summary:</strong> The DFA has 2 states, q0 as start/accept state, toggling parity on '0' and self-looping on '1'.
  </div>
</div>`,
    invalidInput: `
<div class="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-200 text-sm">
  <h3 class="font-bold flex items-center gap-2 mb-2"><i class="fa-solid fa-triangle-exclamation"></i> Invalid or Vague Problem Input</h3>
  <p class="text-xs text-rose-300">Your input ("idk solve this thing for me fast") does not contain a recognizable theoretical computer science problem statement.</p>
  <p class="text-xs text-slate-300 mt-2"><strong>Suggested Actions:</strong> Please provide a specific question related to DFA/NFA design, CFG conversions, Turing Machines, or Decidability proofs.</p>
</div>`
  },
  v1: {
    even0s: `
<div class="p-4 bg-slate-900 rounded-xl text-xs space-y-2 text-slate-300 font-mono">
  <p>[v1 Baseline Output - Unstructured Response]</p>
  <p>To make a DFA for an even number of 0s, you need two states q0 and q1. Start at q0. If you see 0 go to q1. If you see another 0 go back to q0. 1s don't change state. q0 is accepting because zero 0s is even.</p>
</div>`
  }
};

function loadPreset(key) {
  if (PRESETS[key]) {
    document.getElementById('problemInput').value = PRESETS[key];
  }
}

function updatePromptBadge(name) {
  document.getElementById('activePromptTag').innerText = name;
}

function runSolver() {
  const input = document.getElementById('problemInput').value.trim();
  const loader = document.getElementById('loader');
  const solutionBox = document.getElementById('solutionBox');
  const selectedVersion = document.querySelector('input[name="promptVersion"]:checked').value;

  if (!input) {
    alert("Please enter a problem statement or choose a preset example.");
    return;
  }

  solutionBox.classList.add('hidden');
  loader.classList.remove('hidden');

  setTimeout(() => {
    loader.classList.add('hidden');
    solutionBox.classList.remove('hidden');

    if (input.toLowerCase().includes("idk") || input.length < 10) {
      solutionBox.innerHTML = MOCK_RESPONSES.v3.invalidInput;
    } else if (selectedVersion === 'v1') {
      solutionBox.innerHTML = MOCK_RESPONSES.v1.even0s;
    } else {
      solutionBox.innerHTML = MOCK_RESPONSES.v3.even0s;
    }
  }, 900);
}

function copyOutput() {
  const text = document.getElementById('solutionBox').innerText;
  navigator.clipboard.writeText(text);
  alert("Solution text copied to clipboard!");
}
