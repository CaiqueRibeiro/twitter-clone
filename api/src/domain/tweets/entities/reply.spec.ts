import { UserId } from "@domain/users/value-objects/user-id"
import { TweetId } from "../value-objects/tweet-id"
import { Reply } from "./reply"

describe('Reply unit tests', () => {
  it('should create a new reply', () => {
    const arrange = {
      tweetId: new TweetId('03c53334-56ba-4c63-8e85-853b18028d3f'),
      userId: new UserId('01367dcf-7e14-411f-9f10-e126df02b57c'),
      content: 'I agree with it',
      timestamp: new Date()
    }
    const reply = Reply.create(arrange)
    expect(reply).toBeDefined()
    expect(reply.tweetId.value).toBe('03c53334-56ba-4c63-8e85-853b18028d3f')
    expect(reply.userId.value).toBe('01367dcf-7e14-411f-9f10-e126df02b57c')
    expect(reply.content).toBe('I agree with it')
    expect(reply.timestamp.toISOString()).toBe(arrange.timestamp.toISOString())
  })

  it('should throw an error if tweetId is not a valid UUID', () => {
    expect(() => Reply.create({
      tweetId: new TweetId('1'),
      userId: new UserId('01367dcf-7e14-411f-9f10-e126df02b57c'),
      content: 'I agree with it',
      timestamp: new Date()
    })).toThrow('Value 1 must be a valid UUID')
  })

  it('should throw an error if userId is not a valid UUID', () => {
    expect(() => Reply.create({
      tweetId: new TweetId('03c53334-56ba-4c63-8e85-853b18028d3f'),
      userId: new UserId('15'),
      content: 'I agree with it',
      timestamp: new Date()
    })).toThrow('Value 15 must be a valid UUID')
  })

  it('should convert Tweet to JSON', () => {
    const arrange = {
      tweetId: new TweetId('03c53334-56ba-4c63-8e85-853b18028d3f'),
      userId: new UserId('01367dcf-7e14-411f-9f10-e126df02b57c'),
      content: 'I agree with it',
      timestamp: new Date()
    }
    const tweet = Reply.create(arrange)
    const json = tweet.toJSON()
    expect(json).toEqual({
      id: expect.any(String),
      tweetId: arrange.tweetId.value,
      userId: arrange.userId.value,
      content: arrange.content,
      timestamp: expect.any(String),
    })
  })
})