export const TipInput = ({ tip, setTip }) => (
  <div>
    <label>Tip:</label>
    <input
      type="number"
      min="0"
      step="0.01"
      value={tip}
      onChange={e => setTip(e.target.value)}
      placeholder="Enter tip amount"
    />
  </div>
);