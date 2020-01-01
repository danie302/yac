import { createToken, doLogin } from '../auth';

describe('#createToken', () => {
    it('should create a token', async () => {
        const user = {
            id: '1',
            username: 'foo',
            password: 'bar',
            email: 'foo@bar.com'
        };

        const [token] = await createToken(user);

        expect(token.length).toBe(297);
    });
});