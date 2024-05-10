import nodeRedTestHelper from "node-red-node-test-helper";
import axios from 'axios'
import nodeInit from '../nodes/get-entity/get-entity';
import { GetEntityNodeDef } from '../nodes/get-entity/modules/types';
import grocyConfigNode from '../nodes/grocy-config/grocy-config'; // assuming you have a separate file for this

nodeRedTestHelper.init(require.resolve('node-red'));

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: 'mocked data' }))
}));

describe('get-entity node', () => {
  beforeEach((done) => {
    // Clears the mock call record before each test
    nodeRedTestHelper.startServer(done);
  });

  afterEach(async () => {
    await nodeRedTestHelper.unload();
    nodeRedTestHelper.stopServer();
  });

  it('should be loaded', async () => {
    const flow = [{ id: "n1", type: "get-entity", name: "test get-entity", wires: [["n2"]] }];
    await nodeRedTestHelper.load(nodeInit, flow, () => {
      const n1 = nodeRedTestHelper.getNode("n1");
      expect(n1.name).toEqual("test get-entity");
    });
  });

  it('should make an API call with correct URL and headers', async () => {
    const flow = [
      { id: "n1", type: "get-entity", entity_type: "tasks", server: 'n2' },
      {
        id: "n2",
        type: "grocy-config",
        url: "http://examplegrocyurl.com",
        gkey: "some-api-key"
    }
    ];
    const testPayload = { order: "desc", limit: 10 };
    const expectedUrl = "http://examplegrocyurl.com/api/objects/tasks?order=desc&limit=10";
    
    await nodeRedTestHelper.load([nodeInit, grocyConfigNode], flow, async () => {
      const n1 = nodeRedTestHelper.getNode("n1");
      const n2 = nodeRedTestHelper.getNode("n2");
      n2.on("input", function (msg) {
        expect(msg.payload).toEqual({ result: 'mocked data' });
      });
      //axios.get.mockResolvedValue({ data: { result: 'mocked data' } });
      
      await n1.receive({ payload: testPayload });
      
      expect(axios.get).toHaveBeenCalledWith(expectedUrl, {
        headers: {
          'GROCY-API-KEY': 'some-api-key',
          'Accept': 'application/json'
        }
      });
    });
  });

});
