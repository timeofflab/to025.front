const dotenv = require('../src/node_modules/dotenv');
const {sprintf} = require('../src/node_modules/sprintf-js');
const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'src');

const cfg = {
    branch: 'main',
    envPath: `${srcDir}/.env`,
    jsonPath: `${srcDir}/configs/version.json`,
};

process.chdir(srcDir);
dotenv.config();

if (!fs.existsSync(cfg.envPath)) {
    console.error('.env is not exists: ', cfg.envPath);
    process.exit(255);
}

if (!fs.existsSync(cfg.jsonPath)) {
    console.error('JSON file is not exists: ', cfg.jsonPath);
    process.exit(255);
}

if (!process.env.DEPLOY_USER_NAME) {
    console.error('.env > DEPLOY_USER_NAME is Blank');
    process.exit(255);
}

if (!process.env.DEPLOY_USER_EMAIL) {
    console.error('.env > DEPLOY_USER_EMAIL is Blank');
    process.exit(255);
}

/**
 * Random number
 * @returns {number}
 */
function getRandomNum() {
    const max = 90;
    const min = 10;
    return Math.floor(Math.random() * (max - min) + min);
}

const deploy = async () => {
    console.log('Start Deploy Process！');
    try {
        const d = new Date();
        const build = sprintf("%02s-%02s-%02s-%02s-%02s-%02s-%02s",
            d.getFullYear() - 2000,
            d.getMonth() + 1,
            d.getDate(),
            d.getHours(),
            d.getMinutes(),
            d.getSeconds(),
            getRandomNum());

        console.log('Build is ', build);

        // prepare process //////////////////////////////////////////////////////
        const orgGitName = execSync('git config --get user.name').toString();
        const orgGitEmail = execSync('git config --get user.email').toString();

        execSync(`git config user.name ${process.env.DEPLOY_USER_NAME}`);
        execSync(`git config user.email ${process.env.DEPLOY_USER_EMAIL}`);
        execSync('git reset --hard');
        execSync('git pull');

        // Update process //////////////////////////////////////////////////////
        const o = JSON.parse(fs.readFileSync(cfg.jsonPath).toString());
        const no = (() => {
            return {
                ...{
                    Version: "*",
                },
                ...(o || {}),
                ...{
                    Build: build,
                },
            };
        })();

        fs.writeFileSync(cfg.jsonPath, JSON.stringify(no, null, 4));

        execSync(`git commit ${cfg.jsonPath} -m"version ${no.Version} / ${no.Build}"`);
        execSync(`git push`);
        execSync(`git config user.name ${orgGitName}`);
        execSync(`git config user.email ${orgGitEmail}`);

        console.log('Complete!！');
    } catch (e) {
        console.log('Error - ', e);
    }
}

/**
 * メイン処理
 */
const main = async () => {
    await deploy();
};

// 起動
(async () => {
    await main();
})();
