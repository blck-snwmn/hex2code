import { useReducer, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  FormLabel,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  Textarea,
} from '@chakra-ui/react';

type Action = { language: 'Go'; input: string; word: number };

const mapper = {};

const reducer = (_: string, action: Action) => {
  const input = action.input;
  const split = input.split(' ');
  const filltered = split.filter((i) => i.length == 2);
  const mapped = filltered.map((i) => '0x' + i + ','); // to hex format

  const format = mapped.reduce((acc, x) => { // fix the length of one line
    const last = acc.length - 1;
    acc[last].push(x);
    if (acc[last].length == action.word) {
      acc.push([]); // new line
    }
    return acc;
  }, [[]] as [string[]]);
  const joined = format.map((i) => i.join(' ')).join('\n');
  return joined;
};

function App() {
  const [value, setValue] = useState('');
  const [wordNum, setWordNum] = useState('');
  const [state, dispatch] = useReducer(reducer, '');

  return (
    <Container maxW='100rem'>
      <Grid
        templateAreas={`"left right"`}
        gridTemplateColumns={'1fr 1fr'}
        gridTemplateRows={'1fr'}
        gap={6}
      >
        <GridItem area={'left'}>
          <Textarea
            rows={20}
            cols={100}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          >
          </Textarea>
          <FormLabel htmlFor='wordPerLint'>1行の文字数</FormLabel>
          <NumberInput name='wordPerLint'>
            <NumberInputField
              onChange={(e) => {
                setWordNum(e.target.value);
              }}
            />
          </NumberInput>
          <Button
            onClick={() => {
              const w = Number(wordNum);
              dispatch({ language: 'Go', input: value, word: w ? w : 8 });
            }}
          >
            Change
          </Button>
        </GridItem>
        <GridItem area={'right'}>
          <Textarea rows={20} cols={200} value={state}></Textarea>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default App;
