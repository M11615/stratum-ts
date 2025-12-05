# Load model directly
import os
from typing import List, Dict
from transformers import AutoTokenizer, AutoModelForCausalLM, PreTrainedTokenizerBase, PreTrainedModel
from torch import Tensor

base_directory: str = os.path.dirname(__file__)
repository_snapshot_directory: str = os.path.join(base_directory, "./.models/models--TinyLlama--TinyLlama-1.1B-Chat-v1.0/snapshots")
snapshot_hashes: List[str] = os.listdir(repository_snapshot_directory)
snapshot_paths: List[str] = [os.path.join(repository_snapshot_directory, snapshot_hash) for snapshot_hash in snapshot_hashes]
latest_snapshot_path: str = max(snapshot_paths, key=os.path.getmtime)
tokenizer: PreTrainedTokenizerBase = AutoTokenizer.from_pretrained(latest_snapshot_path, local_files_only=True)
model: PreTrainedModel = AutoModelForCausalLM.from_pretrained(latest_snapshot_path, local_files_only=True)

def inference_process(input_text: str) -> str:
  messages: List[Dict[str, str]] = [
    {"role": "user", "content": input_text}
  ]
  inputs: Dict[str, Tensor] = tokenizer.apply_chat_template(
    messages,
    add_generation_prompt=True,
    tokenize=True,
    return_dict=True,
    return_tensors="pt"
  ).to(model.device)
  outputs: Tensor = model.generate(**inputs, max_new_tokens=512)

  return tokenizer.decode(outputs[0][inputs["input_ids"].shape[-1]:])
