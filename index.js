#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import {
    createSpinner
} from "nanospinner";

console.log(chalk.bgGreen("Hello World!"))

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        "Who Wants To Be A JavaScript  Millionaire? \n"
    )

    await sleep()
    rainbowTitle.stop()

    console.log(`
    ${chalk.bgBlue("How To Play")}
    I am a process on your computer
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the question right
    `)
}
async function askName() {
    const answers = await inquirer.prompt({
        name: "player_name",
        type: "input",
        message: "What is your name?",
        default () {
            return "Player"
        }
    })

    playerName = answers.player_name
}

// async function question1() {
//     const answers = await inquirer.prompt({
//         name: "question_1",
//         type: "list",
//         message: "Javascript was created in 10 days then released on\n",
//         choices: [
//             "May 23rd, 1995",
//             "Nov 24th, 1995",
//             "Dec 4th, 1995",
//             "Dec 17, 1996"
//         ]
//     })
//     return handleAnswer(answers.question_1 == "Dec 4th, 1995")
// }

function templateQuestion(name, type, message, choices) {
    const answers = inquirer.prompt({
        name,
        type,
        message,
        choices
    })
    return answers
}

async function question1() {
    const answers = await templateQuestion("question_1", "list", "Javascript was created in 10 days then released on\n", [
        "May 23rd, 1995",
        "Nov 24th, 1995",
        "Dec 4th, 1995",
        "Dec 17, 1996"
    ])
    // let coba = new templateQuestion()
    return handleAnswer(answers.question_1 === "Dec 4th, 1995")
}

async function question2() {
    const answers = await templateQuestion("question_2", "list", "Who was the first President of Indonesia?\n", [
        "Soekarno",
        "Joko Widodo",
        "Megawati Sukarnoputri",
        "Suharto"
    ])
    return handleAnswer(answers.question_2 === "Soekarno")
}

async function question3() {
    const answers = await templateQuestion("question_3", "list", "When is Indonesia's Independence Day celebrated?\n", [
        "17 Agustus",
        "1 Juli",
        "10 November",
        "20 Mei"
    ])
    return handleAnswer(answers.question_3 === "17 Agustus")
}

async function question4() {
    const answers = await templateQuestion("question_4", "list", "In what year did Indonesia gain independence from Dutch colonial rule?\n", [
        "1945",
        "1950",
        "1942",
        "1965"
    ])
    return handleAnswer(answers.question_4 === "1945")
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner("Checking answer...").start()
    await sleep()

    if (isCorrect) {
        spinner.success({
            text: `Nice work${playerName}. That's a legit answer`
        })
    } else {
        spinner.error({
            text: `Game over, you lose ${playerName}`
        })
        process.exit(1)
    }
}

function winner() {
    console.clear()
    const msg = `Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data))
    })
}

await welcome()
await askName()
await question1()
await question2()
await question3()
await question4()
await winner()